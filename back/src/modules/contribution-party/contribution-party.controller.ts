import { Controller } from '@nestjs/common';
import { ContributionPartyService } from './contribution-party.service';

@Controller('contribution-party')
export class ContributionPartyController {
  constructor(private contributionPartyService: ContributionPartyService) {
    // Do nothing.
  }
}
