import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(newUser: CreateUserDto) {
    const existingUser = await this.findByUsername(newUser.username);
    if (existingUser) {
      throw new Error('User already Exists');
    }
    const user = new User(newUser);
    user.password = hashSync(newUser.password, 10);

    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  findByUsername(username: string) {
    return this.usersRepository.findOneBy({ username });
  }

  update(id: string, updatedUser: UpdateUserDto) {
    return this.usersRepository.update(id, updatedUser);
  }

  remove(id: string) {
    return this.usersRepository.delete(id);
  }
}
