import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { IUser, IUserNotPass } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): Promise<IUserNotPass[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<IUser> {
    return this.usersService.getById(id);
  }

  @Post()
  create(
    @Body() CreateUserDto: CreateUserDto,
  ): Promise<IUserNotPass> {
    return this.usersService.create(CreateUserDto);
  }
  
  @Put(':id')
  update(
    @Body() updateProductDto: UpdatePasswordDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<IUserNotPass> {
    return this.usersService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
