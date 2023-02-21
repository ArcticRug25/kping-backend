import { Merchant } from './merchant.entity'
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

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

  @OneToOne(() => Merchant, { onDelete: 'CASCADE' })
  @JoinColumn()
  merchant: Merchant
}
