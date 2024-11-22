import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { PlaceService } from './place.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('place')
export class PlaceController {
  constructor(private placeService: PlaceService) {
    // Do nothing.
  }

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  createPlace(@Request() req, @Body() body) {
    return this.placeService.createPlace(req.user, body);
  }

  @Put('update')
  @UseGuards(AuthGuard('jwt'))
  async update(@Request() req, @Body() changesPlace) {
    return await this.placeService.updatePlace(req.user, changesPlace);
  }
}
