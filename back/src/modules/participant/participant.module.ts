import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from 'src/models/participant/participant.entity';
import { ParticipantController } from './participant.controller';
import { ParticipantService } from './participant.service';

@Module({
  imports: [TypeOrmModule.forFeature([Participant])],
  controllers: [ParticipantController],
  providers: [ParticipantService],
  exports: [ParticipantService],
})
export class ParticipantModule {}
