import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, Query,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../auth/guards/jwt.guard';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (e) {
      console.error(e);
      throw new BadRequestException(e.message);
    }
  }

  @Get()
  async findAll(@Query('fields') fields: string[]) {
    try {
      return this.usersService.findAll(fields);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('fields') fields: string[]) {
    try {
      return this.usersService.findOne(id, fields);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.usersService.update(id, updateUserDto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return this.usersService.remove(id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get(':id/relatives')
  async findRelatives(@Param('id') id: string, @Query('fields') fields: string[]) {
    try {
      return this.usersService.fetchRelatives(id, fields);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
