import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Merchant } from '../../merchant/entities/merchant.entity'
import { Voucher } from '../../voucher/entities/voucher.entity'
import { MerchantMember } from './merchant-member.entity'
import { VoucherMember } from '../../voucher/entities/voucher-member.entity'

export enum Gender {
  Male = 'male',
  Female = 'female',
  Unknown = 'unknown',
}

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  phonenumber: string

  @Column({ type: 'enum', enum: Gender, default: Gender.Unknown })
  gender: Gender

  @Column()
  isHalal: boolean

  @Column()
  distance: string

  @Column({ name: 'last_action' })
  lastAction: Date

  @OneToMany(() => VoucherMember, (voucherMember) => voucherMember.member)
  vouchers: Voucher[]

  @OneToMany(() => MerchantMember, (merchantmember) => merchantmember.merchant)
  merchants: Merchant[]
}
