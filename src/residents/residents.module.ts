import { Module } from '@nestjs/common';
import { ResidentsService } from './residents.service';
import { ResidentsController } from './residents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resident } from './entities/resident.entity';

@Module({
  controllers: [ResidentsController],
  exports: [ResidentsService],
  imports: [TypeOrmModule.forFeature([Resident])],
  providers: [ResidentsService],
})
export class ResidentsModule {}
