import { Component, OnInit, OnDestroy, Input } from '@angular/core'
import { catchError, finalize, of, Subscription, tap } from 'rxjs'
import { Router } from '@angular/router'
import { UserService } from '../../../data/services/user.service'

// NgRx
import { Store } from '@ngrx/store'
import * as UserActions from '../../../data/NgRx/controller/user/userAction'
import { User } from '../../../data/NgRx/models/user'
import { UserState } from '../../../data/NgRx/controller/user/userReducer'

@Component({
  selector: 'app-home-header-user-modal',
  templateUrl: './home-header-user-modal.component.html',
  styleUrls: ['./home-header-user-modal.component.scss'],
})
export class HomeHeaderUserModalComponent implements OnDestroy, OnInit {
  @Input() userData: User
  isSubscribed: Subscription | undefined
  firstItemTxt: string = 'Mes Rendez-vous'
  secondItemTxt: string = 'Profile'
  buttonTxt: string = 'Déconnexion'

  logout() {
    this.isSubscribed = this.userService
      .disconnectUserRequest()
      .pipe(
        tap((response) =>
          this.store.dispatch(
            UserActions.logout({ response, isLoggedIn: false })
          )
        ),
        catchError((error) => {
          console.error(error)
          return of(null)
        }),
        finalize(() => {
          this.goToSignIn()
        })
      )
      .subscribe()
  }

  goToSignIn() {
    return this.router.navigate(['account/login'])
  }

  goToBookedDate() {
    return this.router.navigate(['account/Booked'])
  }

  goToProfile() {
    return this.router.navigate(['account/profile'])
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store<{ user: UserState }>
  ) {}
  ngOnInit() {}
  ngOnDestroy() {
    this.isSubscribed?.unsubscribe()
  }
}
