import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from 'src/models/review/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
  ) {
    // Do nothing.
  }
}
