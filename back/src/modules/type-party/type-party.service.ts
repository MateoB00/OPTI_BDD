import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeParty } from 'src/models/type-party/type-party.entity';
import { TypePartyCreateDto } from 'src/models/type-party/type-party.dto';

@Injectable()
export class TypePartyService {
  constructor(
    @InjectRepository(TypeParty)
    private typePartyRepository: Repository<TypeParty>,
  ) {
    // Do nothing.
  }

  async createTypeParty(
    typeParty: TypePartyCreateDto,
  ): Promise<TypePartyCreateDto> {
    return await this.typePartyRepository.save(typeParty);
  }

  async getAll(): Promise<TypeParty[] | undefined> {
    return await this.typePartyRepository
      .createQueryBuilder('typeParty')
      .select([
        'typeParty.id',
        'typeParty.type',
        'typeParty.namesGames',
        'typeParty.platformVideoGames',
      ])
      .getMany();
  }
}
