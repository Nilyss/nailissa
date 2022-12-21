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
  template: `
    <div *ngIf="userData" class="headerUserModal">
      <article class="headerUserModalWrapper">
        <p class="headerUserModalWrapper__userName">
          {{ userData.firstName }}
          {{ userData.lastName }}
        </p>
        <nav class="headerUserModalWrapper__nav">
          <ul class="headerUserModalWrapper__nav__ul">
            <li
              (click)="goToBookedDate()"
              class="headerUserModalWrapper__nav__ul__link"
            >
              <span
                class="headerUserModalWrapper__nav__ul__link__icon material-symbols-outlined"
              >
                event
              </span>
              {{ firstItemTxt }}
            </li>
            <li
              (click)="goToProfile()"
              class="headerUserModalWrapper__nav__ul__link"
            >
              <span
                class="headerUserModalWrapper__nav__ul__link__icon material-symbols-outlined"
              >
                settings_suggest
              </span>
              {{ secondItemTxt }}
            </li>
          </ul>
          <div class="headerUserModalWrapper__nav__buttonWrapper">
            <button
              class="headerUserModalWrapper__nav__buttonWrapper__btn"
              (click)="logout()"
            >
              <span
                class="headerUserModalWrapper__nav__buttonWrapper__btn__icon material-symbols-outlined"
              >
                logout
              </span>
              {{ buttonTxt }}
            </button>
          </div>
        </nav>
      </article>
    </div>
  `,
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
