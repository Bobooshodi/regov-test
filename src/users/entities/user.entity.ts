import { Column, Entity, ObjectId, ObjectIdColumn, Unique } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(["email", "username", "ssn"])
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
  _id: ObjectId;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  ssn: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  username: string;

  @Exclude()
  @Column({ select: false })
  password: string;
}
