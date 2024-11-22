import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CenterOfInterest } from 'src/models/center-of-interest/center-of-interest.entity';
import { CenterOfInterestController } from './center-of-interest.controller';
import { CenterOfInterestService } from './center-of-interest.service';

@Module({
  imports: [TypeOrmModule.forFeature([CenterOfInterest])],
  controllers: [CenterOfInterestController],
  providers: [CenterOfInterestService],
  exports: [CenterOfInterestService],
})
export class CenterOfInterestModule {}
