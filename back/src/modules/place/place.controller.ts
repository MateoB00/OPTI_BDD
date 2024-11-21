import {
  Controller,
  Get,
  UseGuards,
  Query,
  Request,
  Put,
  Body,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { PlaceService } from './place.service';

@Controller('place')
export class PlaceController {
  constructor(private placeService: PlaceService) {
    // Do nothing.
  }
}
