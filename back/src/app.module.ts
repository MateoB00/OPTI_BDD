import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/models/user/user.entity';
import { UserModule } from 'src/modules/user/user.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { CenterOfInterestModule } from './modules/center-of-interest/center-of-interest.module';
import { ContributionPartyModule } from './modules/contribution-party/contribution-party.module';
import { ParticipantModule } from './modules/participant/participant.module';
import { PartyModule } from './modules/party/party.module';
import { PlaceModule } from './modules/place/place.module';
import { ReviewModule } from './modules/review/review.module';
import { TypePartyModule } from './modules/type-party/type-party.module';
import { MessageModule } from './modules/message/message.module';
import { CenterOfInterest } from './models/center-of-interest/center-of-interest.entity';
import { ContributionParty } from './models/contribution-party/contribution-party.entity';
import { Message } from './models/message/message.entity';
import { Participant } from './models/participant/participant.entity';
import { Party } from './models/party/party.entity';
import { Place } from './models/place/place.entity';
import { Review } from './models/review/review.entity';
import { TypeParty } from './models/type-party/type-party.entity';
import { PartyParticipantSummary } from './models/party-participant-summary/party-participant-summary.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [
          User,
          CenterOfInterest,
          ContributionParty,
          Message,
          Participant,
          Party,
          Place,
          Review,
          TypeParty,
          PartyParticipantSummary,
        ],
        synchronize: true,
        logging: ['query', 'error', 'schema'],
        logger: 'file',
      }),
    }),
    UserModule,
    AuthModule,
    CenterOfInterestModule,
    ContributionPartyModule,
    MessageModule,
    ParticipantModule,
    PartyModule,
    PlaceModule,
    ReviewModule,
    TypePartyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
