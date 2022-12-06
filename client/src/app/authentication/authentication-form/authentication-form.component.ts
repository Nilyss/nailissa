import { Component, OnInit, OnDestroy } from '@angular/core'
import { User } from '../user'
import { AuthenticationService } from '../authentication.service'
import { Subscription, switchMap, tap, map } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-authentication-form',
  templateUrl: './authentication-form.component.html',
  styleUrls: ['./authentication-form.component.scss'],
})
export class AuthenticationFormComponent implements OnInit, OnDestroy {
  isSubscription: Subscription | undefined
  queryValue: string
  isSignup: boolean
  isLogin: boolean
  firstNameInput: string = ''
  firstNameLabel: string = 'Prénom : '
  lastNameInput: string = ''
  lastNameLabel: string = 'Nom :'
  emailInput: string = ''
  emailLabel: string = 'Adresse email :'
  phoneNumberInput: string = ''
  phoneNumberLabel: string = 'Numéro de Téléphone :'
  passwordInput: string = ''
  passwordLabel: string = 'Mot de passe :'
  confirmPasswordInput: string = ''
  confirmPasswordLabel: string = 'Confirmer le mot de passe :'
  formSignUpName: string = 'Crée un compte : '
  formLoginName: string = 'Se connecter : '
  submitFormButton: string = 'Valider'
  passwordFormat: string =
    'Le mot de passe doit comprendre: 1 capitale, 1 minuscule, 1 chiffre, au moins 8 caractères'
  errorMessage: string = ''

  handleForm() {
    if (this.isSignup) {
      if (this.passwordInput !== this.confirmPasswordInput) {
        this.errorMessage = 'Les mots de passe saisis ne sont pas identiques'
      }
      if (this.passwordInput === this.confirmPasswordInput) {
        const user: User = {
          _id: '',
          firstName: this.firstNameInput,
          lastName: this.lastNameInput,
          email: this.emailInput,
          phoneNumber: this.phoneNumberInput,
          password: this.passwordInput,
          postalAddress: {
            address: 'Veuillez saisir votre adresse',
            extendAddress: "Étage, numéro d'appartement, lieu-dit etc...",
            number: "Numéro de l'adresse",
            postalCode: 'Code postal',
            city: 'Ville',
          },
        }
        this.isSubscription = this.authService
          .createUserRequest(user)
          .pipe(
            tap((user) => {
              if (!user) {
                this.errorMessage =
                  'Un compte avec cette adresse email ou ce numéro de téléphone est déjà existant.'
              }
            }),
            switchMap(() =>
              this.authService
                .connectUserRequest(this.emailInput, this.passwordInput)
                .pipe(
                  tap((user) => {
                    if (user) this.goToHome()
                  })
                )
            )
          )
          .subscribe()
      }
    }
    if (this.isLogin) {
      const userLogs: { email: string; password: string } = {
        email: this.emailInput,
        password: this.passwordInput,
      }
      this.isSubscription = this.authService
        .connectUserRequest(userLogs.email, userLogs.password)
        .pipe(
          map((user) => {
            if (!user) {
              this.passwordInput = ''
              this.errorMessage = 'Adresse email ou mot de passe incorrect'
            }
            if (user) this.goToHome()
          })
        )
        .subscribe()
    }
  }

  goToHome() {
    return this.router.navigate([''])
  }

  //  onInit functions
  getFormKind() {
    this.isSubscription = this.activatedRoute.url
      .pipe(tap((res) => (this.queryValue = res[1].path)))
      .subscribe()
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {}
  ngOnInit() {
    this.getFormKind()
    this.isSignup = this.queryValue === 'signup'
    this.isLogin = this.queryValue === 'login'
  }
  ngOnDestroy() {
    this.isSubscription?.unsubscribe()
  }
}
