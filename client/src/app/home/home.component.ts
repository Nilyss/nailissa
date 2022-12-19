import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store } from '@ngrx/store'
import disableScroll from 'disable-scroll'
import AOS from 'aos'
import { UserService } from '../data/services/user.service'
import { catchError, Observable, of, Subscription, switchMap, tap } from 'rxjs'
import { getUserData } from '../data/NgRx/controller/user/userAction'
import { User } from '../data/NgRx/models/user'

@Component({
  selector: 'app-home',
  template: `
    <body class="body">
      <!--      <app-home-loader></app-home-loader>-->
      <header>
        <app-home-header></app-home-header>
      </header>
      <main>
        <section>
          <app-home-banner></app-home-banner>
        </section>
        <section>
          <app-home-first-article></app-home-first-article>
          <app-home-second-article></app-home-second-article>
        </section>
        <section>
          <app-home-link-cards></app-home-link-cards>
        </section>
        <section>
          <app-home-newsletter></app-home-newsletter>
          <app-home-contact></app-home-contact>
        </section>
      </main>
      <footer>
        <app-home-footer></app-home-footer>
      </footer>
      <app-back-to-top></app-back-to-top>
    </body>
  `,
  styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined
  user$: Observable<User>
  user: User
  disableScrollWhileLoader() {
    disableScroll.on()
    setTimeout(enable, 3000)
    function enable() {
      disableScroll.off()
    }
  }

  initPackageAOS() {
    AOS.init({
      disable: 'mobile',
    })
    AOS.refreshHard()
    AOS.refresh()
  }

  getConnectedUserData() {
    this.subscription = this.userService
      .getConnectedUserId()
      .pipe(
        switchMap((userId: string) =>
          this.userService.getConnectedUserData(userId)
        ),
        tap((user: Omit<User, 'password'>) => {
          this.store.dispatch(getUserData({ user }))
          this.user$ = this.store.select('user')
        }),
        catchError((error) => this.handleError(error, undefined))
      )
      .subscribe()
  }

  constructor(
    private store: Store<{ user }>,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.initPackageAOS()
    this.disableScrollWhileLoader()
    this.getConnectedUserData()
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }

  private handleError(error: Error, errorValue: any) {
    console.error('catch error =>', error)
    return of(errorValue)
  }
}
