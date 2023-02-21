import { Column, ManyToOne, PrimaryGeneratedColumn, Entity } from 'typeorm'
import { Member } from '../../member/entities/member.entity'
import { Merchant } from '../../merchant/entities/merchant.entity'

@Entity()
export class Voucher {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  amount: number

  @Column({
    name: 'expire_at',
    comment: '过期时间',
  })
  expiredAt: Date

  @Column({ default: false })
  used: boolean

  @Column({ name: 'used_at', nullable: true })
  usedAt: Date

  @Column({ name: 'min_expense', comment: '最低消费' })
  minimumExpense: number

  @Column({ default: false, comment: '是否可转让' })
  transferrable: boolean

  @Column({ default: false, comment: '是否可叠加使用' })
  stackable: boolean

  @Column({ default: false, comment: '是否和其他活动一起使用' })
  useWithOther: boolean

  @ManyToOne(() => Member, (member) => member.vouchers)
  member: Member

  @ManyToOne(() => Merchant, (merchant) => merchant.vouchers)
  merchant: Merchant
}
