import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable, JoinColumn, Index } from 'typeorm'
import { Voucher } from './voucher.entity'
import { Member } from '../../member/entities/member.entity'

@Entity({ name: 'voucher_member' })
export class VoucherMember {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'create_time', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date

  @ManyToOne(() => Member, (member) => member.voucherMember)
  member: Member

  @ManyToOne(() => Voucher, (voucher) => voucher.voucherMembers)
  voucher: Voucher
}
