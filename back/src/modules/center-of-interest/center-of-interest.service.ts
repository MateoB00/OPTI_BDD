import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CenterOfInterest } from 'src/models/center-of-interest/center-of-interest.entity';

@Injectable()
export class CenterOfInterestService {
  constructor(
    @InjectRepository(CenterOfInterest)
    private centerOfInterestRepository: Repository<CenterOfInterest>,
  ) {
    // Do nothing.
  }
}
