import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hashSync } from 'bcrypt';
import { ObjectId } from 'mongodb';
import { ResidentsService } from '../residents/residents.service';
import { Resident } from '../residents/entities/resident.entity';
import { pick } from 'lodash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private residentsService: ResidentsService
  ) {}
  async create(newUser: CreateUserDto): Promise<CreateUserDto> {
    try {
      const existingUser = await this.findByUsername(newUser.username);
      if (existingUser) {
        throw new Error('User already Exists');
      }
      const user = new User(newUser);
      user.password = hashSync(newUser.password, 10);

      return this.usersRepository.save(user);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async findAll(fields: string[] = []) {
    try {
      const query: any = {};
      if (fields.length > 0) {
        query.select = fields;
      }
      return this.usersRepository.find(query);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async findOne(id: string, fields: string[] = []): Promise<User> {
    try {
      const query: any = {
        where: { _id: new ObjectId(id) }
      };
      if (fields.length > 0) {
        query.select = fields;
      }
      const user = await this.usersRepository.findOneBy(query);
      if (!user) {
        throw new NotFoundException('User does not exist')
      }

      return user;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async findByUsername(username: string) {
    try {
      const user = await this.usersRepository.findOneBy({ username });

      if (!user) {
        throw new NotFoundException('User does not exist')
      }

      return user;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async update(id: string, updatedUser: UpdateUserDto) {
    try {
      const userId = new ObjectId(id);

      const existingUser = await this.findOne(id);

      if (!existingUser) {
        throw new Error('User does not exist');
      }

      const transactionResult = await this.usersRepository.update(userId, updatedUser);
      if (transactionResult.affected > 0) {
        return this.findOne(id);
      }

      throw new Error('Something went wrong, unable to update user')
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async remove(id: string) {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw new NotFoundException('User does not exist')
      }
      return this.usersRepository.delete(id);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async fetchRelatives(id: string, fields) {
    const existingUser = await this.findOne(id);

    if (!existingUser) {
      throw new NotFoundException('User does not exist');
    }

    const residentData = await this.residentsService.findBySSN(existingUser.ssn);

    return this.processRelatives(residentData, fields);
  }

  private async processRelatives(resident: Resident, fields = []) {
    const relatives: any = {};
    let father;
    let mother;
    if (resident.spouse) {
      const spouse = resident.gender === 'male' ? 'wife' : 'husband';
      const spouseDetails = await this.residentsService.findOne(resident.spouse.toString());
      relatives[spouse] = pick(spouseDetails, fields);
    }

    if (resident.father) {
      father = await this.residentsService.findOne(resident.father.toString());

      relatives.father = pick(father, fields)
    }

    if (resident.mother) {
      mother = await this.residentsService.findOne(resident.mother.toString())

      relatives.father = pick(mother, fields)
    }

    if (resident.children) {
      const childrenPromises = resident.children.map((childId) => this.residentsService.findOne(childId.toString()))
      const children = await Promise.all(childrenPromises);

      relatives.children = children.map((child) =>  pick(child, fields))
    }

    if ((father && father.children.length > 1) || (mother && mother.children.length > 1)) {
      const siblings = father.children || mother.children;

      const siblingsPromises = siblings.map((siblingId) => {
        if (siblingId.toString() === resident._id.toString()) {
          return
        }

        return this.residentsService.findOne(siblingId.toString())
      });
      const siblingsDetails = await Promise.all(siblingsPromises);

      relatives.siblings = siblingsDetails.map((sibling) =>  pick(sibling, fields))
    }

    return relatives;
  }
}
