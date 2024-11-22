import { Controller } from '@nestjs/common';
import { TypePartyService } from './type-party.service';

@Controller('type-party')
export class TypePartyController {
  constructor(private typePartyService: TypePartyService) {
    // Do nothing.
  }
}
