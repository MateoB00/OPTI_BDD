import { Controller } from '@nestjs/common';
import { PartyService } from './party.service';

@Controller('party')
export class PartyController {
  constructor(private partyService: PartyService) {
    // Do nothing.
  }
}
