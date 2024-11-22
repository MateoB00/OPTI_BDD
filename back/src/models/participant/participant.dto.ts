class ParticipantCreateDto {
  userId: number;
  partyId: number;
  paid: boolean;
  status: 'Pending' | 'Accepted' | 'Denied';
}

class ParticipantUpdateDto {
  paid?: boolean;
  status?: 'Pending' | 'Accepted' | 'Denied';
}

class ParticipantResponseDto {
  id: number;
  paid: boolean;
  status: string;
  createdAt: Date;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
  party: {
    id: number;
    name: string;
  };
}

export { ParticipantCreateDto, ParticipantResponseDto, ParticipantUpdateDto };
