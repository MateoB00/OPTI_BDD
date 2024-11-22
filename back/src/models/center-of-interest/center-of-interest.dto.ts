class CenterOfInterestCreateDto {
  centerOfInterest: string;
  userId: number;
}

class CenterOfInterestUpdateDto {
  centerOfInterest?: string;
  userId?: number;
}

class CenterOfInterestResponseDto {
  id: number;
  centerOfInterest: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export {
  CenterOfInterestCreateDto,
  CenterOfInterestResponseDto,
  CenterOfInterestUpdateDto,
};
