import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription, switchMap, tap, map } from 'rxjs'

// Model
import { User } from '../../data/NgRx/models/user'

// Services
import { UserService } from '../../data/services/user.service'

@Component({
  selector: 'app-authentication-form',
  template: `
    <div class="formWrapper">
      <form
        #signUpForm="ngForm"
        (ngSubmit)="handleForm()"
        class="formWrapper__form"
        data-aos="fade-up-right"
        data-aos-duration="800"
        data-aos-easing="ease-out"
      >
        <div class="formWrapper__form__titleWrapper">
          <h2 *ngIf="isSignup" class="formWrapper__form__titleWrapper__title">
            {{ formSignUpName }}
          </h2>
          <h2 *ngIf="isLogin" class="formWrapper__form__titleWrapper__title">
            {{ formLoginName }}
          </h2>
        </div>
        <div class="formWrapper__form__inputWrapper">
          <input
            *ngIf="isSignup"
            pattern="^[ a-zA-Z\\-\\’]+$"
            name="firstName"
            [(ngModel)]="firstNameInput"
            class="formWrapper__form__inputWrapper__inputs firstNameInput"
            type="text"
            #firstName="ngModel"
            required
          />
          <label
            *ngIf="isSignup"
            [ngClass]="
              firstNameInput.length > 0
                ? 'firstNameLabel--active'
                : 'firstNameLabel'
            "
            class="formWrapper__form__inputWrapper__label"
            >{{ firstNameLabel }}
          </label>
          <input
            *ngIf="isSignup"
            pattern="^[ a-zA-Z\\-\\’]+$"
            name="lastName"
            [(ngModel)]="lastNameInput"
            class="formWrapper__form__inputWrapper__inputs lastNameInput"
            type="text"
            #lastName="ngModel"
            required
          />
          <label
            *ngIf="isSignup"
            [ngClass]="
              lastNameInput.length > 0
                ? 'lastNameLabel--active'
                : 'lastNameLabel'
            "
            class="formWrapper__form__inputWrapper__label"
            >{{ lastNameLabel }}
          </label>
          <input
            pattern="^((\\w\\w+)[.\\-]?)+@(([0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3})|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"
            name="email"
            [(ngModel)]="emailInput"
            class="formWrapper__form__inputWrapper__inputs emailInput"
            type="email"
            #email="ngModel"
            required
          />
          <label
            [ngClass]="
              isSignup
                ? emailInput.length > 0
                  ? 'emailLabel--active'
                  : 'emailLabel'
                : emailInput.length > 0
                ? 'loginEmailLabel--active'
                : 'loginEmailLabel'
            "
            class="formWrapper__form__inputWrapper__label"
            >{{ emailLabel }}
          </label>
          <input
            *ngIf="isSignup"
            pattern="(0|\\\\+33|0033)[1-9][0-9]{8}"
            name="phoneNumber"
            [(ngModel)]="phoneNumberInput"
            class="formWrapper__form__inputWrapper__inputs phoneNumberInput"
            type="tel"
            #phoneNumber="ngModel"
            required
          />
          <label
            *ngIf="isSignup"
            [ngClass]="
              phoneNumberInput.length > 0
                ? 'phoneNumberLabel--active'
                : 'phoneNumberLabel'
            "
            class="formWrapper__form__inputWrapper__label"
            >{{ phoneNumberLabel }}</label
          >
          <input
            pattern="^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
            name="password"
            [(ngModel)]="passwordInput"
            class="formWrapper__form__inputWrapper__inputs passwordInput"
            type="password"
            #password="ngModel"
            required
          />
          <label
            [ngClass]="
              isSignup
                ? passwordInput.length > 0
                  ? 'passwordLabel--active'
                  : 'passwordLabel'
                : passwordInput.length > 0
                ? 'loginPasswordLabel--active'
                : 'loginPasswordLabel'
            "
            class="formWrapper__form__inputWrapper__label"
            >{{ passwordLabel }}
          </label>
          <input
            *ngIf="isSignup"
            pattern="^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
            name="confirmPassword"
            [(ngModel)]="confirmPasswordInput"
            class="formWrapper__form__inputWrapper__inputs confirmPasswordInput"
            type="password"
            #confirmPassword="ngModel"
            required
          />
          <label
            *ngIf="isSignup"
            [ngClass]="
              confirmPasswordInput.length > 0
                ? 'confirmPasswordLabel--active'
                : 'confirmPasswordLabel'
            "
            class="formWrapper__form__inputWrapper__label"
            >{{ confirmPasswordLabel }}
          </label>
        </div>
        <div *ngIf="isSignup" class="formWrapper__form__errorMessageWrapper">
          <p
            *ngIf="password.invalid"
            class="formWrapper__form__errorMessageWrapper__passwordSignUp"
          >
            {{ passwordFormat }}
          </p>
        </div>
        <p class="formWrapper__form__errorMessageWrapper__errorMessage">
          {{ errorMessage }}
        </p>
        <div class="formWrapper__form__buttonWrapper">
          <button
            [disabled]="!signUpForm.valid"
            type="submit"
            class="formWrapper__form__buttonWrapper__btn"
          >
            {{ submitFormButton }}
          </button>
        </div>
      </form>
    </div>
  `,
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
        const user: Omit<User, 'bookedDate'> = {
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
        this.isSubscription = this.userService
          .createUserRequest(user)
          .pipe(
            tap((user: Omit<User, 'bookedDate'>) => {
              if (!user) {
                this.errorMessage =
                  'Un compte avec cette adresse email ou ce numéro de téléphone est déjà existant.'
              }
            }),
            switchMap(() =>
              this.userService
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
      this.isSubscription = this.userService
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
    private userService: UserService
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
