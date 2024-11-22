import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from 'src/models/place/place.entity';
import { User } from 'src/models/user/user.entity';
import { PlaceCreateDto, PlaceUpdateDto } from 'src/models/place/place.dto';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place) private placeRepository: Repository<Place>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    // Do nothing.
  }

  async createPlace(
    loggedUser: User,
    place: PlaceCreateDto,
  ): Promise<PlaceCreateDto> {
    const user = await this.userRepository.findOne({
      where: { id: loggedUser.id },
      select: ['id', 'email', 'firstName', 'lastName', 'age'],
    });

    place.user = user;

    return await this.placeRepository.save(place);
  }

  async updatePlace(loggedUser: User, changesPlace: PlaceUpdateDto) {
    const existingPlace = await this.placeRepository
      .createQueryBuilder('place')
      .leftJoinAndSelect('place.user', 'user')
      .where('user.id = :userId', { userId: loggedUser.id })
      .select([
        'place.id',
        'place.address',
        'place.city',
        'place.postalCode',
        'place.region',
      ])
      .addSelect(['user.id'])
      .getOne();

    if (!existingPlace) {
      throw new NotFoundException('Place not found');
    }

    if (loggedUser.id !== existingPlace.user.id) {
      throw new BadRequestException('Bad USER');
    }

    const updatedPlaceData = { ...existingPlace };

    for (const key in changesPlace) {
      if (changesPlace[key] !== null) {
        updatedPlaceData[key] = changesPlace[key];
      }
    }

    const response = await this.placeRepository.update(
      existingPlace.id,
      updatedPlaceData,
    );

    return response;
  }
}
