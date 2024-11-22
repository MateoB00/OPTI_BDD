class PartyCreateDto {
  name: string;
  description: string;
  maxParticipants: number;
  isFree: boolean;
  status: 'Publish' | 'In Progress' | 'Closed' | 'Deleted';
  contribution: boolean;
  startedAt: Date;
  endedAt: Date;
  organizerId: number;
  typePartyId: number;
  placeId: number;
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
