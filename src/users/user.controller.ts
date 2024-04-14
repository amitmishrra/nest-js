import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getAllUsers')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('searchUser/:id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post('createUser')
  create(@Body() createUserDto: User): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Put('updateUser/:id')
  update(@Param('id') id: string, @Body() updateUserDto: User): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('removeUser/:id')
  remove(@Param('id') id: string): Promise<User> {
    return this.userService.remove(id);
  }
}
