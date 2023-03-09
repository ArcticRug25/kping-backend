import { BeforeInsert, Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { generateQRCode } from '../../../utils/qrcode'
import { Merchant } from '../../merchant/entities/merchant.entity'
import { VoucherMember } from './voucher-member.entity'

@Entity()
export class Voucher {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ comment: '票券二维码唯一标识' })
  @Index({ unique: true })
  voucherCode: string

  @Column()
  amount: number

  @Column({ name: 'is_discount', default: false, comment: '是否是折扣券，还是满减券' })
  isDiscount: boolean

  @Column({
    name: 'expire_at',
    comment: '过期时间',
  })
  expiredAt: Date

  @Column({ default: false })
  used: boolean

  @Column({ name: 'total_count', comment: '优惠券所有数量' })
  totalCount: number

  @Column({ name: 'remain_count', comment: '优惠券剩余领取数量' })
  remainCount: number

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

  @Column({ name: 'create_time', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date

  @Column({ type: 'text', comment: '二维码' })
  qrCode: string

  @OneToMany(() => VoucherMember, (voucherMember) => voucherMember.voucher)
  voucherMembers: VoucherMember[]

  @ManyToOne(() => Merchant, (merchant) => merchant.vouchers)
  merchant: Merchant

  @BeforeInsert()
  setRemainCount() {
    this.remainCount = this.totalCount
  }

  @BeforeInsert()
  async setVoucherCode() {
    this.voucherCode = Math.random().toString(36).slice(2, 10)
    this.qrCode = await generateQRCode(this.voucherCode)
  }
}
