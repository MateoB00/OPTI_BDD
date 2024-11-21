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
import { CenterOfInterestService } from './center-of-interest.service';

@Controller('center-of-interest')
export class CenterOfInterestController {
  constructor(private centerOfInterestService: CenterOfInterestService) {

  }
}
