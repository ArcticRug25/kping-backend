import dataSource from '../ormconfig'
import { Member } from '../src/modules/member/entities/member.entity'
import { mock, Random } from 'mockjs'
import { Voucher } from '../src/modules/voucher/entities/voucher.entity'
import { MerchantMember } from '../src/modules/member/entities/merchant-member.entity'
import { VoucherMember } from '../src/modules/voucher/entities/voucher-member.entity'

dataSource
  .initialize()
  .then(async () => {
    // await generateMember()
    // await generateVoucher()
    // await generateMerchanMemberShip()
    // await generateVoucherMemberShip()
    console.log('--------------------Finish--------------------')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })

async function generateMerchanMemberShip() {
  const merchantMemberRepo = dataSource.getRepository(MerchantMember)
  const memberRepo = dataSource.getRepository(Member)
  const memberLen = await memberRepo.count()
  const merchantMemberList = []
  for (let i = 0; i < memberLen; i++) {
    const element = {
      joinTime: new Date(Random.datetime()),
      member: {
        id: i + 1,
      },
      merchant: {
        id: 1,
      },
    } as MerchantMember
    merchantMemberList.push(element)
  }
  merchantMemberRepo.insert(merchantMemberList)
}

async function generateVoucherMemberShip() {
  const voucherMemberRepo = dataSource.getRepository(VoucherMember)
  const voucherRepo = dataSource.getRepository(Voucher)
  const memberRepo = dataSource.getRepository(Member)
  const memberLen = await memberRepo.count()
  const voucherLen = await voucherRepo.count()
  const voucherMemberList = []
  for (let i = 0; i < 80; i++) {
    const element = {
      member: {
        id: Random.integer(1, memberLen),
      },
      voucher: {
        id: Random.integer(1, voucherLen),
      },
    } as VoucherMember
    voucherMemberList.push(element)
  }
  voucherMemberRepo.insert(voucherMemberList)
}

async function generateMember() {
  const memberRepo = dataSource.getRepository(Member)
  const memberList = []
  for (let i = 0; i < 30; i++) {
    const element = {
      gender: ['female', 'male'][Math.round(Math.random())],
      isHalal: Random.boolean(),
      phonenumber: mock(/^1[0-9]{10}$/),
      username: Random.name(),
      distance: String(Random.float(0, 100, 2, 2)),
      lastAction: new Date(Random.datetime()),
    } as Member
    memberList.push(element)
  }
  memberRepo.insert(memberList)
}

async function generateVoucher() {
  const voucherRepo = dataSource.getRepository(Voucher)
  const voucherList = []
  for (let i = 0; i < 9; i++) {
    const totalCount = Random.integer(5, 20)
    const element = {
      expiredAt: new Date(new Date().getTime() + 86400000 * Random.integer(30, 180)),
      amount: Random.integer(10, 99),
      isDiscount: Random.boolean(),
      minimumExpense: Random.integer(100, 300),
      totalCount,
      remainCount: totalCount,
      merchant: {
        id: 1,
      },
    } as Voucher
    voucherList.push(element)
  }
  voucherRepo.insert(voucherList)
}
