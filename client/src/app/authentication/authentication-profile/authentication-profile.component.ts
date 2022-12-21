import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { UserService } from '../../data/services/user.service'
import { Subscription, tap } from 'rxjs'

// Models
import { User } from '../../data/NgRx/models/user'
import { Provision } from '../../data/NgRx/models/provision'

// NgRx
import { select, Store } from '@ngrx/store'
import { UserState } from '../../data/NgRx/controller/user/userReducer'
import { selectUserData } from '../../data/NgRx/controller/user/userSelector'
import { editUserData } from '../../data/NgRx/controller/user/userAction'

@Component({
  selector: 'app-authentication-profile',
  template: `<body>
    <header>
      <app-home-header></app-home-header>
    </header>
    <main>
      <article *ngIf="user" class="footerWrapper">
        <form #editForm="ngForm" class="footerWrapper__form">
          <div class="footerWrapper__form__titleWrapper">
            <h1 class="footerWrapper__form__titleWrapper__title">
              {{ componentTitle }}
            </h1>
          </div>
          <ul class="footerWrapper__form__list">
            <li class="footerWrapper__form__list__elements">
              <span class="elementLabel"
                ><span class="elementIcon material-symbols-outlined">
                  badge </span
                >{{ firstListElement }}</span
              >
              <span class="elementContent capitalise"
                >{{ user.firstName }} {{ user.lastName }}</span
              >
            </li>
            <li class="footerWrapper__form__list__elements">
              <span class="elementLabel"
                ><span class="elementIcon material-symbols-outlined">
                  alternate_email </span
                >{{ secondListElement }}</span
              >
              <span class="elementContent">{{ user.email }}</span>
            </li>
            <li class="footerWrapper__form__list__elements">
              <span class="elementLabel"
                ><span class="elementIcon material-symbols-outlined">
                  phone_iphone
                </span>

                {{ thirdListElement }}</span
              >
              <span class="elementContent">{{ user.phoneNumber }}</span>
            </li>
            <li class="footerWrapper__form__list__elements">
              <span class="elementLabel">
                <span class="elementIcon material-symbols-outlined">
                  house
                </span>
                {{ fourthListElement }}</span
              >
              <ul
                *ngIf="isEdition === true"
                class="footerWrapper__form__list__elements__sublist"
              >
                <li
                  class="footerWrapper__form__list__elements__sublist__elements elementContent"
                >
                  <span class="elementLabel--sublist">{{
                    subListElement3
                  }}</span
                  ><input
                    name="number"
                    [(ngModel)]="numberInput"
                    #number="ngModel"
                    required
                    class="footerWrapper__form__list__elements__sublist__elements__inputs"
                    type="text"
                  />
                </li>
                <li
                  class="footerWrapper__form__list__elements__sublist__elements elementContent"
                >
                  <span class="elementLabel--sublist">{{
                    subListElement1
                  }}</span
                  ><input
                    name="address"
                    [(ngModel)]="addressInput"
                    #address="ngModel"
                    required
                    class="footerWrapper__form__list__elements__sublist__elements__inputs"
                    type="text"
                  />
                </li>
                <li
                  class="footerWrapper__form__list__elements__sublist__elements elementContent"
                >
                  <span class="elementLabel--sublist">{{
                    subListElement2
                  }}</span
                  ><input
                    name="extendAddress"
                    [(ngModel)]="extendAddressInput"
                    #extendAddress="ngModel"
                    required
                    class="footerWrapper__form__list__elements__sublist__elements__inputs"
                    type="text"
                  />
                </li>
                <li
                  class="footerWrapper__form__list__elements__sublist__elements elementContent"
                >
                  <span class="elementLabel--sublist">{{
                    subListElement4
                  }}</span
                  ><input
                    name="postalCode"
                    [(ngModel)]="postalCodeInput"
                    #postalCode="ngModel"
                    required
                    class="footerWrapper__form__list__elements__sublist__elements__inputs"
                    type="text"
                  />
                </li>
                <li
                  class="footerWrapper__form__list__elements__sublist__elements elementContent"
                >
                  <span class="elementLabel--sublist">{{
                    subListElement5
                  }}</span
                  ><input
                    name="city"
                    [(ngModel)]="cityInput"
                    #city="ngModel"
                    required
                    class="footerWrapper__form__list__elements__sublist__elements__inputs"
                    type="text"
                  />
                </li>
              </ul>
              <ul
                *ngIf="isEdition === false"
                class="footerWrapper__form__list__elements__sublist"
              >
                <li
                  class="footerWrapper__form__list__elements__sublist__elements elementContent"
                >
                  <span class="elementLabel--sublist">{{
                    subListElement3
                  }}</span
                  ><span class="elementContent--sublist">{{
                    user.postalAddress.number
                  }}</span>
                </li>
                <li
                  class="footerWrapper__form__list__elements__sublist__elements elementContent"
                >
                  <span class="elementLabel--sublist">{{
                    subListElement1
                  }}</span>
                  <span class="elementContent--sublist">{{
                    user.postalAddress.address
                  }}</span>
                </li>
                <li
                  class="footerWrapper__form__list__elements__sublist__elements elementContent"
                >
                  <span class="elementLabel--sublist">{{
                    subListElement2
                  }}</span
                  ><span class="elementContent--sublist">{{
                    user.postalAddress.extendAddress
                  }}</span>
                </li>
                <li
                  class="footerWrapper__form__list__elements__sublist__elements elementContent"
                >
                  <span class="elementLabel--sublist">{{
                    subListElement4
                  }}</span
                  ><span class="elementContent--sublist">{{
                    user.postalAddress.postalCode
                  }}</span>
                </li>
                <li
                  class="footerWrapper__form__list__elements__sublist__elements elementContent"
                >
                  <span class="elementLabel--sublist">{{
                    subListElement5
                  }}</span
                  ><span class="elementContent--sublist">{{
                    user.postalAddress.city
                  }}</span>
                </li>
              </ul>
            </li>
          </ul>
          <div class="footerWrapper__form__buttonWrapper">
            <button
              [disabled]="!editForm.valid"
              (click)="handleSubmit()"
              class="footerWrapper__form__buttonWrapper__buttons validate"
            >
              {{ firstButton }}
            </button>
            <button
              (click)="editData()"
              class="footerWrapper__form__buttonWrapper__buttons edit"
            >
              {{ secondButton }}
            </button>
            <button
              (click)="cancelEdition()"
              class="footerWrapper__form__buttonWrapper__buttons cancel"
            >
              {{ thirdButton }}
            </button>
          </div>
        </form>
      </article>
    </main>
    <footer><app-home-footer></app-home-footer></footer>
  </body> `,
  styleUrls: ['./authentication-profile.component.scss'],
})
export class AuthenticationProfileComponent implements OnInit, OnDestroy {
  isSubscribed: Subscription | undefined
  addressInput: string
  extendAddressInput: string
  numberInput: string
  postalCodeInput: string
  cityInput: string
  componentTitle: string = 'profile :'
  firstListElement: string = 'Nom : '
  secondListElement: string = 'Adresse email :'
  thirdListElement: string = 'Numéro de téléphone : '
  fourthListElement: string = 'Adresse postale : '
  subListElement1: string = 'Adresse :'
  subListElement2: string = "Complément d'adresse :"
  subListElement3: string = 'Numéro de voie :'
  subListElement4: string = 'Code Postal :'
  subListElement5: string = 'Ville :'
  firstButton: string = 'Valider'
  secondButton: string = 'Modifier'
  thirdButton: string = 'Annuler'

  user: Omit<User, 'password'>
  provisions: Provision[]

  isEdition: boolean = false
  getUserData() {
    this.isSubscribed = this.store
      .pipe(
        select(selectUserData),
        tap((user) => (this.user = user))
      )
      .subscribe()
    this.addressInput = this.user.postalAddress.address
    this.extendAddressInput = this.user.postalAddress.extendAddress
    this.numberInput = this.user.postalAddress.number
    this.postalCodeInput = this.user.postalAddress.postalCode
    this.cityInput = this.user.postalAddress.city
  }

  editData() {
    this.isEdition = !this.isEdition
  }
  cancelEdition() {
    if (this.isEdition) {
      return (this.isEdition = false)
    }
    return this.router.navigate([''])
  }
  handleSubmit() {
    if (this.isEdition) {
      const user: Omit<User, 'password'> = {
        ...this.user,
        postalAddress: {
          address: this.addressInput,
          extendAddress: this.extendAddressInput,
          number: this.numberInput,
          postalCode: this.postalCodeInput,
          city: this.cityInput,
        },
      }

      this.isSubscribed = this.userService
        .editConnectedUserData(user)
        .subscribe(() => this.store.dispatch(editUserData({ user })))

      return (this.isEdition = false)
    } else {
      return this.router.navigate([''])
    }
  }
  constructor(
    private router: Router,
    private userService: UserService,
    private store: Store<{ user: UserState }>
  ) {}
  ngOnInit() {
    this.getUserData()
  }
  ngOnDestroy() {
    this.isSubscribed?.unsubscribe()
  }
}
