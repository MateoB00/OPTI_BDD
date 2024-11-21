import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeParty } from 'src/models/type-party.entity';

@Injectable()
export class TypePartyService {
  constructor(
    @InjectRepository(TypeParty) private typePartyRepository: Repository<TypeParty>,
  ) {
    // Do nothing.
  }
}
