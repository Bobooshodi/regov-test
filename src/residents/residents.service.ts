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

    father.spouse = mother._id.toString();
    father.children = [child._id.toString()];
    mother.children = [child._id.toString()];

    return [father, mother, child];
  }

  async seedData() {
    const familyData = this.makeSeedData();
    return this.residentsRepository.save(familyData);
  }

  async findAll(fields: string[] = []) {
    const query: any = { };
    if (fields.length > 0) {
      query.select = fields;
    }

    return this.residentsRepository.find(query);
  }

  async findOne(id: string, fields: string[] = []) {
    const objectId = new ObjectId(id);
    const query: any = { where: { _id: objectId } };

    if (fields.length > 0) {
      query.select = fields;
    }
    return this.residentsRepository.findOneBy(query);
  }

  async findBySSN(ssn: string) {
    return this.residentsRepository.findOneBy({ ssn });
  }
}
