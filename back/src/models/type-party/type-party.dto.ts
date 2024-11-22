class TypePartyCreateDto {
  namesGames?: string[];
  platformVideoGames?: string;
  type: 'Video Games' | 'Board Games' | 'Classic';
}

class TypePartyUpdateDto {
  namesGames?: string[];
  platformVideoGames?: string;
  type?: 'Video Games' | 'Board Games' | 'Classic';
}

class TypePartyResponseDto {
  id: number;
  namesGames?: string[];
  platformVideoGames?: string;
  type: 'Video Games' | 'Board Games' | 'Classic';
  createdAt: Date;
  parties: {
    id: number;
    name: string;
  }[];
}

export { TypePartyCreateDto, TypePartyResponseDto, TypePartyUpdateDto };
