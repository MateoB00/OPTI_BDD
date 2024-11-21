import {
  Controller,
  Get,
  UseGuards,
  Query,
  Request,
  Put,
  Body,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {
    // Do nothing.
  }
}
