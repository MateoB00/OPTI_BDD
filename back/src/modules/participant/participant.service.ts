import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participant } from 'src/models/participant.entity';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(Participant) private participantRepository: Repository<Participant>,
  ) {
    // Do nothing.
  }
}
