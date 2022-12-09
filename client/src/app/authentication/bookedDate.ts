export class BookedDate {
  _id: string
  day: string
  hour: string
  provision: string

  constructor(_id: string, day: string, hour: string, provision: string) {
    this._id = _id
    this.day = day
    this.hour = hour
    this.provision = provision
  }
}
