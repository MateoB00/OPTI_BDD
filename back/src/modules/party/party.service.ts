import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Party } from 'src/models/party.entity';

@Injectable()
export class PartyService {
  constructor(
    @InjectRepository(Party) private partyRepository: Repository<Party>,
  ) {
    // Do nothing.
  }
}
