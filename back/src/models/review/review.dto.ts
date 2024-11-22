class ReviewCreateDto {
  rate: number;
  comment?: string;
  authorId: number;
  targetUserId?: number;
  targetPartyId?: number;
}

class ReviewUpdateDto {
  rate?: number;
  comment?: string;
  targetUserId?: number;
  targetPartyId?: number;
}

class ReviewResponseDto {
  id: number;
  rate: number;
  comment?: string;
  createdAt: Date;
  author: {
    id: number;
    firstName: string;
    lastName: string;
  };
  targetUser?: {
    id: number;
    firstName: string;
    lastName: string;
  };
  targetParty?: {
    id: number;
    name: string;
  };
}

export { ReviewCreateDto, ReviewResponseDto, ReviewUpdateDto };
