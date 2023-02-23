import { Column, Entity, OneToMany, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm'
import { Logs } from '../../logs/entities/logs.entity'
import { Member } from '../../member/entities/member.entity'
import { Voucher } from '../../voucher/entities/voucher.entity'
import { MerchantMember } from '../../member/entities/merchant-member.entity'
import { Profile } from './profile.entity'
import { Exclude } from 'class-transformer'

@Entity()
export class Merchant {
  @Column('varchar', { name: 'username', unique: true, length: 255 })
  username: string

  @Column('varchar', { name: 'password', length: 255 })
  @Exclude()
  password: string

  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number

  @OneToMany(() => Voucher, (voucher) => voucher.merchant)
  vouchers: Voucher[]

  @OneToMany(() => Logs, (logs) => logs.merchant)
  logs: Logs[]

  @OneToMany(() => MerchantMember, (merchantMember) => merchantMember.merchant)
  merchantMember: Member[]

  @OneToOne(() => Profile, { onDelete: 'CASCADE' })
  @JoinColumn()
  profile: Profile
}
