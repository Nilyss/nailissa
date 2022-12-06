export class Calendar {
  bookedDate: {
    date: Date
    time: string
  }

  constructor(bookedDate: { date: Date; time: string }) {
    this.bookedDate = bookedDate
  }
}
