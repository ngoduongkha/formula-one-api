import { BaseEntity } from 'src/common/entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Race extends BaseEntity {
  @Column()
  grandPrix: string;

  @Column()
  year: number;

  @Column()
  date: string;

  @Column()
  winner: string;

  @Column()
  car: string;

  @Column()
  laps: string;

  @Column()
  time: string;
}
