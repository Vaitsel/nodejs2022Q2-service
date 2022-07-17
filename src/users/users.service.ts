import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 , validate } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { IUser, IUserNotPass } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private users: IUser[] = [];

  async getAll(): Promise<IUserNotPass[]> {
    let UsersNotPass = [];
    this.users.map((user) => {
      const { password, ...UserNotPass } = user;
      UsersNotPass.push(UserNotPass)
    });
    return UsersNotPass;
  }

  async getById(id: string): Promise<IUser> {
    const user = this.users.find((user) => id == user.id);
    if (user) return user;
    throw new NotFoundException('User not found.');
  }

  async create(userDto: CreateUserDto): Promise<IUserNotPass> {
    const User: IUser = {
      id: uuidv4(),
      ...userDto,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    };
    const { password:string, ...UserNotPass } = User;
    this.users.push(User);
    return UserNotPass;
  }

  async update(id: string, userDto: UpdatePasswordDto,): Promise<IUserNotPass> {
    const index: number = this.users.findIndex((user) => user.id === id);
    if (index >= 0) {
      if (this.users[index].password !== userDto.oldPassword)
        throw new ForbiddenException('oldPassword is wrong');
      if (!userDto.newPassword) 
        throw new ForbiddenException('newPassword is wrong');
      const updUser: IUser = {
        ...this.users[index],
        password: userDto.newPassword,
        version: this.users[index].version + 1,
        updatedAt: Date.now(),
      };
      this.users.splice(index, 1, updUser);
      const { password, ...UserNotPass } = updUser;
      return UserNotPass;
    }
    throw new NotFoundException('User not found.');
  }

  async remove(id: string): Promise<void> {
    const ind = this.users.findIndex((user) => id === user.id);
    if (ind >= 0) {
      this.users.splice(ind, 1);
      return;
    }
    throw new NotFoundException('User not found.');
  }
}

