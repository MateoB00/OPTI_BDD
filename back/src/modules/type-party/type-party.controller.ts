import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { TypePartyService } from './type-party.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('type-party')
export class TypePartyController {
  constructor(private typePartyService: TypePartyService) {
    // Do nothing.
  }

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  createPlace(@Request() req, @Body() body) {
    return this.typePartyService.createTypeParty(body);
  }

  @Get('all')
  getAll() {
    return this.typePartyService.getAll();
  }
}
