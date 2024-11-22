class MessageCreateDto {
  content: string;
  senderId: number;
  recipientId: number;
}

class MessageUpdateDto {
  content?: string;
  read?: boolean;
}

class MessageResponseDto {
  id: number;
  content: string;
  read: boolean;
  createdAt: Date;
  sender: {
    id: number;
    email: string;
  };
  recipient: {
    id: number;
    email: string;
  };
}

export { MessageCreateDto, MessageResponseDto, MessageUpdateDto };
