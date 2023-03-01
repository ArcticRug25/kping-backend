import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Merchant } from '../../merchant/entities/merchant.entity'
import { Member } from './member.entity'

@Entity({ name: 'merchant_member' })
export class MerchantMember {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'join_time', default: () => 'CURRENT_TIMESTAMP' })
  joinTime: Date

  @ManyToOne(() => Member, (member) => member.voucherMember)
  member: Member

  @ManyToOne(() => Merchant, (merchant) => merchant.merchantMember)
  merchant: Merchant
}
