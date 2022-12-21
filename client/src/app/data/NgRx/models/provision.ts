export class Provision {
  _id: string
  name: string
  price: string
  time: string
  overview: string
  image: string
  constructor(
    _id: string,
    name: string,
    price: string,
    time: string,
    overview: string,
    image: string
  ) {
    this._id = _id
    this.name = name
    this.price = price
    this.time = time
    this.overview = overview
    this.image = image
  }
}
