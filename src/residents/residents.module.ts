import { Module } from '@nestjs/common';
import { ResidentsService } from './residents.service';
import { ResidentsController } from './residents.controller';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resident } from './entities/resident.entity';

@Module({
  controllers: [ResidentsController],
  imports: [TypeOrmModule.forFeature([Resident])],
  providers: [
    ResidentsService],
})
export class ResidentsModule {}
