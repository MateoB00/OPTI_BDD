import { Place } from '../place/place.entity';
import { TypeParty } from '../type-party/type-party.entity';
import { User } from '../user/user.entity';

class PartyCreateDto {
  name: string;
  description: string;
  maxParticipants: number;
  isFree: boolean;
  status: 'Publish' | 'In Progress' | 'Closed' | 'Deleted';
  contribution: boolean;
  startedAt: Date;
  endedAt: Date;
  organizer: User;
  typeParty: TypeParty;
  place: Place;
}

class PartyUpdateDto {
  name?: string;
  description?: string;
  maxParticipants?: number;
  isFree?: boolean;
  status?: 'Publish' | 'In Progress' | 'Closed' | 'Deleted';
  contribution?: boolean;
  startedAt?: Date;
  endedAt?: Date;
}

class PartyResponseDto {
  id: number;
  name: string;
  description: string;
  maxParticipants: number;
  isFree: boolean;
  status: string;
  contribution: boolean;
  startedAt: Date;
  endedAt: Date;
  createdAt: Date;
  organizer: {
    id: number;
    email: string;
    lastName: string;
    firstName: string;
  };
  typeParty: {
    id: number;
    type: 'Video Games' | 'Board Games' | 'Classic';
  };
  place: {
    id: number;
    address: string;
    city: string;
  };
}

export { PartyCreateDto, PartyResponseDto, PartyUpdateDto };
