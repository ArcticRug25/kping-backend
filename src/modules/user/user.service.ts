import { Injectable, Body } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import argon2 from 'argon2'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}
  async create(@Body() createUserDto: CreateUserDto) {
    const userTpl = await this.userRepo.create(createUserDto)
    userTpl.password = await argon2.hash(userTpl.password)
    return await this.userRepo.save(userTpl)
  }

  findAll() {
    return this.userRepo.find()
  }

  find(username: string) {
    return this.userRepo.findOne({ where: { username } })
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
