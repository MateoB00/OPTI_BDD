import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from 'src/models/place/place.entity';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place) private placeRepository: Repository<Place>,
  ) {
    // Do nothing.
  }
}
