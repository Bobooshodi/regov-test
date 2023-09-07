import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { ResidentsService } from './residents.service';
import { CreateResidentDto } from './dto/create-resident.dto';
import { UpdateResidentDto } from './dto/update-resident.dto';

@Controller('residents')
export class ResidentsController {
  constructor(private readonly residentsService: ResidentsService) {}

  @Post('seed')
  async seed() {
    try {
      return this.residentsService.seedData();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get()
  async findAll(@Query('fields') fields: string[]) {
    try {
      return this.residentsService.findAll(fields);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('fields') fields: string[]) {
    try {
      return this.residentsService.findOne(id, fields);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
