import { Column, Entity, ObjectIdColumn, Unique } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Entity()
@Unique(["email", "username"])
export class User {
  constructor(user?: CreateUserDto) {
    if (!!user) {
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.username = user.username;
    }
  }

  @ObjectIdColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  username: string;

  @Column()
  password: string;
}
