import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Merchant } from '../../merchant/entities/merchant.entity'

@Entity()
export class Logs {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  path: string

  @Column()
  method: string

  @Column()
  data: string

  @Column()
  result: number

  @Column()
  ip: string

  @CreateDateColumn({ name: 'create_time', comment: '创建时间' })
  createTime: Date

  @ManyToOne(() => Merchant, (merchant) => merchant.logs)
  @JoinColumn()
  merchant: Merchant
}
