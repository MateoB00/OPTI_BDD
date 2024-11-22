class ContributionPartyCreateDto {
  game?: string;
  food?: string;
  partyId: number;
  userId: number;
}

class ContributionPartyUpdateDto {
  game?: string;
  food?: string;
  partyId?: number;
  userId?: number;
}

class ContributionPartyResponseDto {
  id: number;
  game?: string;
  food?: string;
  createdAt: Date;
  party: {
    id: number;
    name: string;
  };
  user: {
    id: number;
    email: string;
    lastName: string;
    firstName: string;
  };
}

export {
  ContributionPartyCreateDto,
  ContributionPartyResponseDto,
  ContributionPartyUpdateDto,
};
