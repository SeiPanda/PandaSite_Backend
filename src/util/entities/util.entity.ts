import { Instruction } from 'src/instruction/entities/instruction.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Util {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  name: string;

  @ManyToMany(() => Instruction, (instruction) => instruction.utils)
  @JoinTable({
    name: 'Instruction_Util',
    synchronize: false,
    joinColumn: {
      name: 'util_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'instruction_id',
      referencedColumnName: 'id',
    },
  })
  instructions: Instruction[];
}
