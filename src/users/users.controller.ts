
import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { UpdateUserDto } from '../auth/dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  // GET /api/users
  @Get()
  findAll() {
    return this.usersService.findAllUsers();
  }

  // GET /api/users/:id
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.findUserById(id);
  }

  // PATCH /api/users/:id
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(
      id,
      updateUserDto,
    );
  }

  // DELETE /api/users/:id
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.deleteUser(id);
  }
}
