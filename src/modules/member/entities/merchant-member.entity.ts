import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Merchant } from '../../merchant/entities/merchant.entity'
import { Member } from './member.entity'

@Entity('merchant_member')
export class MerchantMember {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'join_time', default: () => 'CURRENT_TIMESTAMP' })
  joinTime: Date

  @ManyToOne(() => Member, (member) => member.merchants)
  member: Member

  @ManyToOne(() => Merchant, (merchant) => merchant.members)
  merchant: Merchant
}
