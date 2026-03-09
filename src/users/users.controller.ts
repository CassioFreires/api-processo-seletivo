import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user (admin only)' })
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 409, description: 'Username already taken' })
  async create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get(':username')
  @ApiOperation({ summary: 'Get user by username' })
  @ApiParam({ name: 'username', description: 'Username to lookup' })
  @ApiResponse({ status: 200, description: 'User found' })
  async findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }
}
