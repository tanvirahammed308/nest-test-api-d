import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  // REGISTER
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  // LOGIN
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // GET USER
  @Get('user/:id')
  getUser(@Param('id') id: string) {
    return this.authService.getUser(Number(id));
  }

  // UPDATE USER
  @Patch('user/:id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.updateUser(
      Number(id),
      updateUserDto,
    );
  }

  // DELETE USER
  @Delete('user/:id')
  deleteUser(@Param('id') id: string) {
    return this.authService.deleteUser(Number(id));
  }
}