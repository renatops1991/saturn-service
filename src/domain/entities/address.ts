import type { AddressDto } from '@/main/dtos/address/address.dto'

export class Address {
  street: string
  number: string
  neighborhood: string
  complements?: string
  city: string
  state: string

  static makeAddress (addressDto: AddressDto): Address {
    const address = new Address()
    address.street = addressDto.street
    address.number = addressDto.number
    address.neighborhood = addressDto.neighborhood
    if (addressDto.complements) {
      address.complements = addressDto.complements
    }
    address.city = addressDto.city
    address.state = addressDto.state

    return address
  }
}
