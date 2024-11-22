import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PartyService } from './party.service';
import { AuthGuard } from '@nestjs/passport';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('party')
export class PartyController {
  constructor(private partyService: PartyService) {
    // Do nothing.
  }

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  createPlace(@Request() req, @Body() body) {
    return this.partyService.createParty(req.user, body);
  }

  @Get('all')
  @UseInterceptors(CacheInterceptor)
  getAll() {
    return this.partyService.getAll();
  }

  @Get('all/pagination')
  @UseInterceptors(CacheInterceptor)
  getAllWithPagination(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 20,
  ) {
    return this.partyService.getAllWithPagination(page, pageSize);
  }
}
