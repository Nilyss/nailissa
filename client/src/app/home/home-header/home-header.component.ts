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
  template: `
    <div id="accueil" class="headerWrapper">
      <nav class="headerWrapper__contactWrapper">
        <ul class="headerWrapper__contactWrapper__list">
          <li class="headerWrapper__contactWrapper__list__elements">
            <figure
              class="headerWrapper__contactWrapper__list__elements__iconWrapper"
            >
              <img
                [src]="phoneCallIcon"
                alt="phone call icon"
                class="headerWrapper__contactWrapper__list__elements__iconWrapper__logo"
              />
            </figure>
            <a
              class="headerWrapper__contactWrapper__list__elements__iconWrapper--href"
              href="tel: +33666327763"
              title="Ligne direct"
            >
              {{ phoneNumber }}
            </a>
          </li>
          <li class="headerWrapper__contactWrapper__list__elements">
            <figure
              class="headerWrapper__contactWrapper__list__elements__iconWrapper"
            >
              <img
                [src]="whatsappIcon"
                alt="phone call icon"
                class="headerWrapper__contactWrapper__list__elements__iconWrapper__logo"
              />
            </figure>
            <a
              class="headerWrapper__contactWrapper__list__elements__iconWrapper--href"
              href="https://wa.me/+336666327763"
              title="Contacter sur What's app"
            >
              {{ phoneNumber }}
            </a>
          </li>
          <li class="headerWrapper__contactWrapper__list__elements">
            <figure
              class="headerWrapper__contactWrapper__list__elements__iconWrapper"
            >
              <img
                [src]="mailIcon"
                alt="phone call icon"
                class="headerWrapper__contactWrapper__list__elements__iconWrapper__logo"
              />
            </figure>
            <a
              class="headerWrapper__contactWrapper__list__elements__iconWrapper--href"
              href="mailto: contact@nailissa.fr"
              title="Envoyer un mail"
            >
              {{ mailAddress }}
            </a>
          </li>
        </ul>
        <ul class="headerWrapper__contactWrapper__list">
          <li class="headerWrapper__contactWrapper__list__elements">
            {{ socialMessage }}
          </li>
          <li
            class="headerWrapper__contactWrapper__list__elements"
            [title]="firstFollowTitle"
          >
            <figure
              class="headerWrapper__contactWrapper__list__elements__logoWrapper"
            >
              <img
                class="headerWrapper__contactWrapper__list__elements__logoWrapper__logo"
                [src]="firstFollowLogo"
                alt="facebook.com logo"
              />
            </figure>
          </li>
          <li
            class="headerWrapper__contactWrapper__list__elements"
            [title]="secondFollowTitle"
          >
            <figure
              class="headerWrapper__contactWrapper__list__elements__logoWrapper"
            >
              <img
                class="headerWrapper__contactWrapper__list__elements__logoWrapper__logo"
                [src]="secondFollowLogo"
                alt="instagram logo"
              />
            </figure>
          </li>
        </ul>
        <ul
          *ngIf="user === undefined"
          class="headerWrapper__contactWrapper__account"
        >
          <li class="headerWrapper__contactWrapper__account__buttons">
            <button
              (click)="goToLogin()"
              class="headerWrapper__contactWrapper__account__buttons__btn"
            >
              {{ firstAccountBtn }}
            </button>
          </li>
          <li class="headerWrapper__contactWrapper__account__buttons">
            <button
              (click)="goToSignUp()"
              class="headerWrapper__contactWrapper__account__buttons__btn"
            >
              {{ secondAccountBtn }}
            </button>
          </li>
        </ul>
        <ul *ngIf="user" class="headerWrapper__contactWrapper__account">
          <li
            (mouseenter)="toggleProfileModal($event)"
            class="headerWrapper__contactWrapper__account__connected"
          >
            <p
              class="headerWrapper__contactWrapper__account__connected__userName"
            >
              <span class="material-symbols-outlined"> waving_hand </span>
              {{ hiMessage }} {{ user.firstName }} !
            </p>
            <span
              class="headerWrapper__contactWrapper__account__connected__icon material-symbols-outlined"
            >
              arrow_drop_down
            </span>
          </li>
        </ul>
      </nav>
      <nav class="headerWrapper__navWrapper">
        <div class="headerWrapper__navWrapper__branding">
          <a class="navLink brandingLink" routerLink="" fragment="accueil">
            <figure class="headerWrapper__navWrapper__branding__logoWrapper">
              <img
                class="headerWrapper__navWrapper__branding__logoWrapper__picture"
                [src]="brandingLogo"
                alt="Branding Logo"
              />
            </figure>
            <p class="headerWrapper__navWrapper__branding__text">
              Nail<span
                class="headerWrapper__navWrapper__branding__text--secondColor"
                >issa</span
              >
            </p>
          </a>
        </div>
        <ul class="headerWrapper__navWrapper__navigation">
          <li class="headerWrapper__navWrapper__navigation__link">
            <a class="navLink" routerLink="" fragment="accueil">accueil</a>
          </li>
          <li class="headerWrapper__navWrapper__navigation__link">
            <a class="navLink" routerLink="" fragment="services">services</a>
          </li>
          <li class="headerWrapper__navWrapper__navigation__link">
            <a class="navLink" routerLink="" fragment="prestations"
              >prestations</a
            >
          </li>
          <li class="headerWrapper__navWrapper__navigation__link">
            <a class="navLink" routerLink="" fragment="articles">articles</a>
          </li>
          <li class="headerWrapper__navWrapper__navigation__link">
            <a class="navLink" routerLink="" fragment="contacts">contacts</a>
          </li>
        </ul>
        <a
          routerLink=""
          fragment="prestations"
          class="headerWrapper__navWrapper__branding__buttonWrapper"
        >
          <button
            class="headerWrapper__navWrapper__branding__buttonWrapper__button"
          >
            {{ searchButton }}
          </button>
        </a>
      </nav>
      <div
        (mouseleave)="toggleProfileModal($event)"
        [ngClass]="
          isShowUserProfileModal
            ? 'headerWrapper__userModalWrapper--active'
            : 'headerWrapper__userModalWrapper'
        "
      >
        <span
          class="headerWrapper__userModalWrapper__icon material-symbols-outlined"
        >
          arrow_drop_up
        </span>
        <app-home-header-user-modal
          [userData]="user"
        ></app-home-header-user-modal>
      </div>
    </div>
  `,
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
