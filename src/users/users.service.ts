import { Injectable, ConflictException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import db from '../config/db';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  async findByUsername(username: string) {
    return db('users').where({ username }).first();
  }

  async create(createDto: CreateUserDto) {
    const existing = await this.findByUsername(createDto.username);
    if (existing) {
      throw new ConflictException('Username already taken');
    }
    const hashed = await bcrypt.hash(createDto.password, 10);
    const [id] = await db('users').insert({
      username: createDto.username,
      password: hashed,
    });
    return { id, username: createDto.username };
  }
}
