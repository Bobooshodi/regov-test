import { Injectable } from '@nestjs/common';
import { CreateResidentDto } from './dto/create-resident.dto';
import { UpdateResidentDto } from './dto/update-resident.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resident } from './entities/resident.entity';
import { faker, Sex } from '@faker-js/faker';
import { ObjectId } from 'mongodb';

@Injectable()
export class ResidentsService {
  constructor(
    @InjectRepository(Resident)
    private residentsRepository: Repository<Resident>,
  ) {
  }
  private makeSeedData = () => {
    const maleSexType: any = Sex.Male;
    const femaleSexType: any = Sex.Female;
    const father: Resident = new Resident({
      id: new ObjectId(),
      firstName: faker.person.firstName(maleSexType),
      lastName: faker.person.lastName(maleSexType),
      occupation: faker.person.jobTitle(),
      age: faker.number.int({ min: 35, max: 65 }),
      gender: maleSexType,
      isActive: true,
    });
    const mother: Resident = new Resident({
      id: new ObjectId(),
      firstName: faker.person.firstName(femaleSexType),
      lastName: faker.person.lastName(femaleSexType),
      occupation: faker.person.jobTitle(),
      age: faker.number.int({ min: 35, max: 65 }),
      gender: femaleSexType,
      isActive: true,
      spouse: father._id
    });
    const child: Resident = new Resident({
      id: new ObjectId(),
      firstName: faker.person.firstName(maleSexType),
      lastName: faker.person.lastName(maleSexType),
      occupation: faker.person.jobTitle(),
      age: faker.number.int({ min: 22, max: 34 }),
      gender: maleSexType,
      isActive: true,
      father: father._id,
      mother: mother._id,
    });

    father.spouse = mother._id;
    father.children = [child._id];
    mother.children = [child._id];

    return [father, mother, child];
  }

  create(createResidentDto: CreateResidentDto) {
    const familyData = this.makeSeedData();
    return this.residentsRepository.save(familyData);
  }

  findAll() {
    return this.residentsRepository.find();
  }

  findOne(id: string) {
    const objectId = new ObjectId(id);
    return this.residentsRepository.findOneBy({ _id: objectId });
  }

  update(id: number, updateResidentDto: UpdateResidentDto) {
    return `This action updates a #${id} resident`;
  }

  remove(id: string) {
    const objectId = new ObjectId(id);
    return this.residentsRepository.delete(objectId);
  }
}
