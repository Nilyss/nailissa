import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '../../authentication/authentication.service'
import { map, Subscription, switchMap } from 'rxjs'
import { User } from '../../authentication/user'

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss'],
})
export class HomeHeaderComponent implements OnInit, OnDestroy {
  @Output() outputUserData = new EventEmitter<any>()
  isSubscribed: Subscription | undefined
  userData: User
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
    this.isSubscribed = this.authService
      .getConnectedUserId()
      .pipe(
        switchMap((userId) => this.authService.getConnectedUserData(userId)),
        map((user) => {
          this.userData = user
          this.outputUserData.emit(user)
        })
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
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.getUserData()
    this.getTime()
  }
  ngOnDestroy() {
    this.isSubscribed?.unsubscribe()
  }
}
