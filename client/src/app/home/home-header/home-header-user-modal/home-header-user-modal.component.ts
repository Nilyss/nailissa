import { Component, OnInit, OnDestroy, Input } from '@angular/core'
import { User } from '../../../authentication/user'
import { AuthenticationService } from '../../../authentication/authentication.service'
import { Subscription } from 'rxjs'
import { Router } from '@angular/router'

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
    this.isSubscribed = this.authService
      .disconnectUserRequest()
      .subscribe(() => this.goToSignIn())
  }

  goToSignIn() {
    return this.router.navigate(['account/login'])
  }

  goToProfile() {
    return this.router.navigate(['account/profile'])
  }
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}
  ngOnInit() {}
  ngOnDestroy() {
    this.isSubscribed?.unsubscribe()
  }
}
