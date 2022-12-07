import { UserBasicInfoType, UserType } from '@/data/types'

export const fixturesBuildUserBasicInfo = (): UserBasicInfoType => ({
  name: 'John Foo Bar',
  email: 'foo@example.com',
  password: 'hashed',
  confirmUser: false,
  createdAt: new Date(),
  updatedAt: new Date()
})

export const fixturesBuildUser = (): UserType => ({
  id: 'foo',
  name: 'John Foo Bar',
  birthDate: new Date('1991-08-01'),
  age: 31,
  address: {
    street: 'foo',
    number: 'A1',
    neighborhood: 'bar',
    complements: 'xis',
    city: 'foo',
    state: 'SP'
  },
  phone: ['11554678952'],
  type: 'PERSON',
  document: '000000000000',
  updatedAt: new Date()
})
