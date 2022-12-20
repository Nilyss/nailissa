import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core'
import { Router } from '@angular/router'
import { Subscription, tap } from 'rxjs'
import { UserService } from '../../data/services/user.service'

// NgRx
import { Store, select } from '@ngrx/store'
import { selectUserData } from '../../data/NgRx/controller/user/userSelector'
import { User } from '../../data/NgRx/models/user'
import { UserState } from '../../data/NgRx/controller/user/userReducer'

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss'],
})
export class HomeHeaderComponent implements OnInit, OnDestroy {
  @Output() outputUserData = new EventEmitter<any>()
  isSubscribed: Subscription | undefined
  user: User
  hours: number
  isShowUserProfileModal: boolean = false

  // ********** HTML innerText **********
  mailAddress: string = 'contact@nailissa.fr'
  phoneNumber: string = '+33(0)6.66.32.77.63'
  mailIcon: string = 'assets/images/logos/email.png'
  phoneCallIcon: string = 'assets/images/logos/phone.png'
  whatsappIcon: string = 'assets/images/logos/whatsapp.png'
  socialMessage: string = 'Suivez nous sur :'
  firstFollowTitle: string = 'Facebook'
  firstFollowLogo: string = 'assets/images/logos/facebook.png'
  secondFollowTitle: string = 'Instagram'
  secondFollowLogo: string = 'assets/images/logos/instagram.png'
  firstAccountBtn: string = 'Se connecter'
  secondAccountBtn: string = 'Crée un compte'
  brandingLogo: string = 'assets/images/logos/pumps.png'
  searchButton: string = 'Planifier un rendez-vous'
  hiMessage: string

  // ********** onClick btn **********
  goToLogin() {
    return this.router.navigate(['account/login'])
  }
  goToSignUp() {
    return this.router.navigate(['account/signup'])
  }
  toggleProfileModal(event: Event) {
    this.isShowUserProfileModal = !this.isShowUserProfileModal
  }

  // ********** on init component **********

  getUserData() {
    this.isSubscribed = this.store
      .pipe(
        select(selectUserData),
        tap((user: User) => (this.user = user))
      )
      .subscribe()
  }

  getTime() {
    const date = new Date()
    this.hours = date.getHours()
    this.hours >= 18
      ? (this.hiMessage = 'Bonsoir')
      : (this.hiMessage = 'Bonjour')
  }
  constructor(
    private router: Router,
    private userService: UserService,
    private store: Store<{ user: UserState }>
  ) {}

  ngOnInit() {
    this.getTime()
    this.getUserData()
  }
  ngOnDestroy() {
    this.isSubscribed?.unsubscribe()
  }
}
