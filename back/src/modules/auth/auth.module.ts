import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../models/user/user.entity';
import { JwtStrategy } from '../../middlewares/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import jwtConfig from 'src/config/jwt.config';

@Module({
  providers: [AuthService, JwtStrategy, UserService],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User]),
    jwtConfig,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}
