import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUserByPassword(loginAttempt: LoginUserDto) {
    const userToAttempt = await this.usersService.findOneByEmail(loginAttempt.login);

    if(!userToAttempt) {
      throw new NotFoundException('user not exist');
    }

    return new Promise((resolve) => {
      userToAttempt.checkPassword(loginAttempt.password, (err, isMatch) => {

        if (err) {
          throw new UnauthorizedException();
        }

        if (isMatch) {
            resolve(this.createJwtPayload(userToAttempt));
        } else {
            throw new UnauthorizedException();
        }
      });
    });
  }

  async createUserData(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    return this.createJwtPayload(user)
  }

  async validateUserByJwt(payload: JwtPayload) {
    const user = await this.usersService.findOneByEmail(payload.login);

    if (user) {
        return this.createJwtPayload(user);
    } else {
        throw new UnauthorizedException();
    }
  }

  createJwtPayload(user) {
    const data: JwtPayload = {
      login: user.login,
    };

    const jwt = this.jwtService.sign(data);

    return {
      expiresIn: 3600,
      token: jwt,
      login: user.login,
    };
  }
}
