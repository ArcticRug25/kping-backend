import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Logs } from '../../logs/entities/logs.entity'

@Entity('user', { schema: 'test' })
export class User {
  @Column('varchar', { name: 'username', unique: true, length: 255 })
  username: string

  @Column('varchar', { name: 'password', length: 255 })
  password: string

  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number

  @OneToMany(() => Logs, (logs) => logs.user)
  logs: Logs[]
}
