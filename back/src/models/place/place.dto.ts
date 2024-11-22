class PlaceCreateDto {
  address: string;
  city: string;
  postalCode: string;
  region: string;
  userId: number;
}

class PlaceUpdateDto {
  address?: string;
  city?: string;
  postalCode?: string;
  region?: string;
  userId?: number;
}

class PlaceResponseDto {
  id: number;
  address: string;
  city: string;
  postalCode: string;
  region: string;
  user: {
    id: number;
    email: string;
    lastName: string;
    firstName: string;
  };
  parties: {
    id: number;
    name: string;
  }[];
}

export { PlaceCreateDto, PlaceResponseDto, PlaceUpdateDto };
