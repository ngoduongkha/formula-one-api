import { BaseEntity } from 'src/common/entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Driver extends BaseEntity {
  @Column()
  position: number;

  @Column()
  year: number;

  @Column()
  name: string;

  @Column()
  nationality: string;

  @Column()
  team: string;

  @Column()
  points: number;
}
