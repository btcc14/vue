import { Model } from 'mongoose';
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const createdUserData = new this.userModel(createUserDto);
    const user = await this.userModel.findOne({ login: createUserDto.login });

    if (user){
      throw new ConflictException('User already exist');
    }

    return await createdUserData.save();
  }

  async findOneByEmail(login): Model<User> {
    return await this.userModel.findOne({ login });
  }
}
