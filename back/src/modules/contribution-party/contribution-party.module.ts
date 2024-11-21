import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContributionParty } from 'src/models/contribution-party.entity';
import { ContributionPartyController } from './contribution-party.controller';
import { ContributionPartyService } from './contribution-party.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContributionParty])],
  controllers: [ContributionPartyController],
  providers: [ContributionPartyService],
  exports: [ContributionPartyService],
})
export class ContributionPartyModule {}
