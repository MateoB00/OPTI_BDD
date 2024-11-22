import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from 'src/models/place/place.entity';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { User } from 'src/models/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Place, User])],
  controllers: [PlaceController],
  providers: [PlaceService],
  exports: [PlaceService],
})
export class PlaceModule {}
