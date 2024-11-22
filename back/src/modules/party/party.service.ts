import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Party } from 'src/models/party/party.entity';
import { User } from 'src/models/user/user.entity';
import { PartyCreateDto } from 'src/models/party/party.dto';
import { Place } from 'src/models/place/place.entity';
import { TypeParty } from 'src/models/type-party/type-party.entity';

@Injectable()
export class PartyService {
  constructor(
    @InjectRepository(Party) private partyRepository: Repository<Party>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Place) private placeRepository: Repository<Place>,
    @InjectRepository(TypeParty)
    private typePartyRepository: Repository<TypeParty>,
  ) {
    // Do nothing.
  }

  async createParty(
    loggedUser: User,
    party: PartyCreateDto,
  ): Promise<PartyCreateDto> {
    const user = await this.userRepository.findOne({
      where: { id: loggedUser.id },
      select: ['id', 'email', 'firstName', 'lastName', 'age'],
    });

    const place = await this.placeRepository.findOne({
      where: { id: party.place.id },
      select: ['id'],
    });

    const typeParty = await this.typePartyRepository.findOne({
      where: { id: party.typeParty.id },
      select: ['id'],
    });

    party.organizer = user;
    party.typeParty = typeParty;
    party.place = place;

    return await this.partyRepository.save(party);
  }

  async getAllWithPagination(page: number, pageSize: number) {
    // Le queryBuilder utilisant un LIMIT & OFFSET déclenche deux requêtes SQL
    return await this.partyRepository.manager.query(
      `
        SELECT DISTINCT 
                party.id,
                party.name,
                party.description,
                party."maxParticipants",
                party."isFree",
                party.status,
                party.contribution,
                party."startedAt",
                party."endedAt",
                party."createdAt",
                "user"."firstName" AS firstNameUser,
                "user"."lastName" AS lastNameUser,
                type_party.type AS typeParty,
                place.address AS place_address,
                place.city AS place_city
        FROM party 
        LEFT JOIN type_party 
        ON party."typePartyId" = type_party.id
        LEFT JOIN place
        ON party."placeId" = place.id
        LEFT JOIN "user"
        ON party."organizerId" = "user".id
        ORDER BY party."startedAt" ASC
        LIMIT $1 OFFSET $2;
      `,
      [pageSize, (page - 1) * pageSize],
    );
  }

  async getAll() {
    return await this.partyRepository
      .createQueryBuilder('party')
      .distinct(true)
      .leftJoinAndSelect('party.organizer', 'user')
      .leftJoinAndSelect('party.place', 'place')
      .leftJoinAndSelect('party.typeParty', 'typeParty')
      .orderBy('party.id', 'ASC')
      .addOrderBy('party.startedAt', 'ASC')
      .getMany();
  }
}
