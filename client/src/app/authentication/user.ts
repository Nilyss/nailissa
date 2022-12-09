export class User {
  _id: string
  email: string
  password: string
  firstName: string
  lastName: string
  phoneNumber: string
  postalAddress: {
    address: string
    extendAddress: string
    number: string
    postalCode: string
    city: string
  }
  constructor(
    _id: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    postalAddress: {
      address: string
      extendAddress: string
      number: string
      postalCode: string
      city: string
    }
  ) {
    this._id = _id
    this.email = email
    this.password = password
    this.firstName = firstName
    this.lastName = lastName
    this.phoneNumber = phoneNumber
    this.postalAddress = postalAddress
  }
}
