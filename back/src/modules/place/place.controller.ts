import { Controller } from '@nestjs/common';
import { PlaceService } from './place.service';

@Controller('place')
export class PlaceController {
  constructor(private placeService: PlaceService) {
    // Do nothing.
  }
}
