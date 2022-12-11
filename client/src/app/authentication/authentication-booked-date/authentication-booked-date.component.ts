import { Component, OnInit, OnDestroy } from '@angular/core'
import { BookedDate } from '../bookedDate'
import { Subscription, switchMap } from 'rxjs'
import { AuthenticationService } from '../authentication.service'

@Component({
  selector: 'app-authentication-booked-date',
  templateUrl: './authentication-booked-date.component.html',
  styleUrls: ['./authentication-booked-date.component.scss'],
})
export class AuthenticationBookedDateComponent implements OnInit, OnDestroy {
  isSubscribed: Subscription | undefined
  bookedDate: BookedDate | undefined

  componentTitleTrue: string = 'Mon rendez-vous :'
  componentTitleFalse: string = 'Aucun rendez-vous.'
  bookButton: string = 'Planifier un rendez-vous'

  getBookedProvision() {
    this.isSubscribed = this.authService
      .getConnectedUserId()
      .pipe(
        switchMap((userId: string) =>
          this.authService.getUserBookedData(userId)
        )
      )
      .subscribe((bookedDate) => {
        this.bookedDate = bookedDate
      })
  }

  constructor(private authService: AuthenticationService) {}
  ngOnInit() {
    this.getBookedProvision()
  }
  ngOnDestroy() {
    this.isSubscribed?.unsubscribe()
  }
}
