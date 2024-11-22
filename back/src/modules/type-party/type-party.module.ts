import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeParty } from 'src/models/type-party/type-party.entity';
import { TypePartyController } from './type-party.controller';
import { TypePartyService } from './type-party.service';

@Module({
  imports: [TypeOrmModule.forFeature([TypeParty])],
  controllers: [TypePartyController],
  providers: [TypePartyService],
  exports: [TypePartyService],
})
export class TypePartyModule {}
