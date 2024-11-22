import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Party } from 'src/models/party/party.entity';
import { PartyController } from './party.controller';
import { PartyService } from './party.service';
import { TypeParty } from 'src/models/type-party/type-party.entity';
import { Place } from 'src/models/place/place.entity';
import { User } from 'src/models/user/user.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forFeature([Party, TypeParty, Place, User]),
    CacheModule.register({
      ttl: 5,
      max: 100,
    }),
  ],
  controllers: [PartyController],
  providers: [PartyService],
  exports: [PartyService],
})
export class PartyModule {}
