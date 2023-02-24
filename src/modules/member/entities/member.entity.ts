import { camelCase } from 'change-case'
import { Transform } from 'class-transformer'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Merchant } from '../../merchant/entities/merchant.entity'
import { VoucherMember } from '../../voucher/entities/voucher-member.entity'
import { MerchantMember } from './merchant-member.entity'
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

  @Column({ name: 'last_action', default: () => 'CURRENT_TIMESTAMP' })
  lastAction: Date

  @OneToMany(() => VoucherMember, (voucherMember) => voucherMember.member)
  voucherMember: VoucherMember[]

  @OneToMany(() => MerchantMember, (merchantmember) => merchantmember.merchant)
  merchantMember: Merchant[]
}
