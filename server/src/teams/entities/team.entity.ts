import { BaseEntity } from 'src/common/entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Team extends BaseEntity {
  @Column()
  position: string;

  @Column()
  year: number;

  @Column()
  name: string;

  @Column()
  points: number;
}
