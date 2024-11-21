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
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {
    // Do nothing.
  }
}
