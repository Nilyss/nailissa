import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

// Models
import { User } from '../../data/NgRx/models/user'

// NgRx
import { Store } from '@ngrx/store'
import { UserState } from '../../data/NgRx/controller/user/userReducer'
import { selectUserBookedDate } from '../../data/NgRx/controller/user/userSelector'

@Component({
  selector: 'app-authentication-booked-date',
  templateUrl: './authentication-booked-date.component.html',
  styleUrls: ['./authentication-booked-date.component.scss'],
})
export class AuthenticationBookedDateComponent implements OnInit, OnDestroy {
  isSubscribed: Subscription | undefined
  bookedDate: User['bookedDate']
  componentTitleTrue: string = 'Mon rendez-vous :'
  componentTitleFalse: string = 'Aucun rendez-vous.'
  bookButton: string = 'Planifier un rendez-vous'

  getBookedDate() {
    this.isSubscribed = this.store
      .select(selectUserBookedDate)
      .subscribe((bookedDate) => (this.bookedDate = bookedDate))
  }

  constructor(private store: Store<{ user: UserState }>) {}
  ngOnInit() {
    this.getBookedDate()
  }
  ngOnDestroy() {
    this.isSubscribed?.unsubscribe()
  }
}
