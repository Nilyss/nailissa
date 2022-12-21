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
  templateUrl: './authentication-profile.component.html',
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
