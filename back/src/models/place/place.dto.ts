import { User } from '../user/user.entity';

class PlaceCreateDto {
  address: string;
  city: string;
  postalCode: string;
  region: string;
  user: User;
}

class PlaceUpdateDto {
  address?: string;
  city?: string;
  postalCode?: string;
  region?: string;
  user: User;
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
