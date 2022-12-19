export class BookedDate {
  _id: string
  day: Date
  hour: string
  provision: {
    _id: string
    name: string
    price: string
    overview: string
    image: string
    time: string
  }

  constructor(
    _id: string,
    day: Date,
    hour: string,
    provision: {
      _id: string
      name: string
      price: string
      overview: string
      image: string
      time: string
    }
  ) {
    this._id = _id
    this.day = day
    this.hour = hour
    this.provision = provision
  }
}
