import { Component, OnInit, OnDestroy } from '@angular/core'
import { User } from '../user'
import { Router } from '@angular/router'
import { AuthenticationService } from '../authentication.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-authentication-profile',
  templateUrl: './authentication-profile.component.html',
  styleUrls: ['./authentication-profile.component.scss'],
})
export class AuthenticationProfileComponent implements OnInit, OnDestroy {
  isSubscribed: Subscription | undefined
  userData: User
  getUserData(user: User) {
    this.userData = user
    this.addressInput = this.userData.postalAddress.address
    this.extendAddressInput = this.userData.postalAddress.extendAddress
    this.numberInput = this.userData.postalAddress.number
    this.postalCodeInput = this.userData.postalAddress.postalCode
    this.cityInput = this.userData.postalAddress.city
  }
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

  isEdition: boolean = false
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
      const user: User = {
        ...this.userData,
        postalAddress: {
          address: this.addressInput,
          extendAddress: this.extendAddressInput,
          number: this.numberInput,
          postalCode: this.postalCodeInput,
          city: this.cityInput,
        },
      }
      this.isSubscribed = this.authService
        .editConnectedUserData(user)
        .subscribe()
      this.isEdition = false
      this.isSubscribed = this.authService
        .getConnectedUserData(this.userData._id)
        .subscribe()
      return this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => {
          this.router.navigate(['account/profile'])
        })
    } else {
      return this.router.navigate([''])
    }
  }
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}
  ngOnInit() {}
  ngOnDestroy() {
    this.isSubscribed?.unsubscribe()
  }
}
