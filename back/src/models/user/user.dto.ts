import { CenterOfInterest } from '../center-of-interest/center-of-interest.entity';
import { Message } from '../message/message.entity';
import { Party } from '../party/party.entity';
import { Participant } from '../participant/participant.entity';
import { ContributionParty } from '../contribution-party/contribution-party.entity';
import { Place } from '../place/place.entity';
import { Review } from '../review/review.entity';

class UserCreateDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
}

class UserUpdateDto {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  age?: number;
}

class UserResponseDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;
  centersOfInterests: CenterOfInterest[];
  participations: Participant[];
  parties: Party[];
  sentMessages: Message[];
  receivedMessages: Message[];
  contributionsParty: ContributionParty[];
  places: Place[];
  authorReviews: Review[];
  reviews: Review[];
}

export { UserCreateDto, UserUpdateDto, UserResponseDto };
