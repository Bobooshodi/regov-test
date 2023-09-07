import {
  Column,
  Entity,
  ObjectId,
  ObjectIdColumn,
} from 'typeorm';
import { Transform } from 'class-transformer';

@Entity()
export class Resident {
  constructor(resident?: any) {
    if (resident) {
      this._id = resident.id;
      this.firstName = resident.firstName;
      this.lastName = resident.lastName;
      this.occupation = resident.occupation;
      this.ssn = resident.ssn;
      this.age = resident.age;
      this.gender = resident.gender;
      this.isActive = resident.isActive || true;
      this.spouse = resident.spouse;
      this.father = resident.father;
      this.mother = resident.mother;
      this.children = resident.children || [];
    }
  }
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  ssn: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  occupation: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column({ default: true })
  isActive: boolean;

  @ObjectIdColumn({nullable: true})
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  spouse?: string;

  @ObjectIdColumn({nullable: true})
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  father?: string;

  @ObjectIdColumn()
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  mother: string;

  @Column("simple-array")
  children: string[];
}
