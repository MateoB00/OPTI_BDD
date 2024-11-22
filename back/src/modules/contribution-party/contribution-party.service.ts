import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContributionParty } from 'src/models/contribution-party/contribution-party.entity';

@Injectable()
export class ContributionPartyService {
  constructor(
    @InjectRepository(ContributionParty)
    private contributionPartyRepository: Repository<ContributionParty>,
  ) {
    // Do nothing.
  }
}
