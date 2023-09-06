import {
  Column,
  Entity,
  ObjectId,
  ObjectIdColumn,
} from 'typeorm';

@Entity()
export class Resident {
  constructor(resident?: any) {
    if (resident) {
      this._id = resident.id;
      this.firstName = resident.firstName;
      this.lastName = resident.lastName;
      this.occupation = resident.occupation;
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

  @Column(type => ObjectId)
  spouse: ObjectId;

  @Column(type => ObjectId)
  father: ObjectId;

  @Column(type => ObjectId)
  mother: ObjectId;

  @Column("simple-array")
  children: ObjectId[];
}
