import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Voucher } from './voucher.entity'
import { Member } from '../../member/entities/member.entity'

@Entity('vouchers_members')
export class VoucherMember {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'create_time', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date

  @ManyToOne(() => Member, (member) => member.vouchers)
  member: Member

  @ManyToOne(() => Voucher, (voucher) => voucher.members)
  voucher: Voucher
}
