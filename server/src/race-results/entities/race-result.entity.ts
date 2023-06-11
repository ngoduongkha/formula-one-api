import { BaseEntity } from 'src/common/entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class RaceResult extends BaseEntity {
  @Column()
  position: string;

  @Column()
  year: number;

  @Column()
  no: string;

  @Column()
  driver: string;

  @Column()
  car: string;

  @Column()
  laps: string;

  @Column()
  time: string;

  @Column()
  points: string;

  @Column()
  grandPrix: string;
}
