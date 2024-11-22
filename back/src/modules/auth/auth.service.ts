import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {
    // Do nothing.
  }
  async login(email: string, password: string) {
    const userByEmail = await this.userService.findOneByEmail(email);

    if (!userByEmail) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, userByEmail.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      username: email,
      sub: {
        email: userByEmail.email,
      },
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }

  async validateUser(userEmail) {
    return await this.userService.findOneByEmail(userEmail);
  }

  async register(user: User) {
    const existingUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
    if (!emailRegex.test(user.email)) {
      throw new BadRequestException('Email needs to be valid.');
    }

    const password =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{0,}$/u;
    if (!password.test(user.password)) {
      throw new BadRequestException('Password needs to be valid.');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    return hashedPassword;
    // Const newUser = {
    //   email: user.email,
    //   password: hashedPassword,
    //   username: user.username,
    //   phoneNumber: 'default number',
    //   profilePicture: './default_profile_icon.png',
    //   bio: 'default bio',
    //   uniqueLink: `${user.username}-${Math.floor(Math.random() * 1000)}`,
    // };

    // const createdUser = await this.userRepository.save(newUser);

    // return createdUser;
  }
}
