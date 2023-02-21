import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  gender: number

  @Column()
  photo: string

  @Column()
  address: string
}
