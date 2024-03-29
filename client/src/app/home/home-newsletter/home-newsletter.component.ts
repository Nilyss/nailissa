import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-home-newsletter',
  template: `
    <article
      class="article"
      data-aos="fade-up"
      data-aos-duration="500"
      data-aos-easing="ease-out"
      data-aos-offset="500"
    >
      <figure class="article__decorationWrapper">
        <img
          class="article__decorationWrapper__decoration leftDecoration"
          [src]="vectorImage"
          alt="decoration"
        />
      </figure>
      <div class="article__newsletterWrapper">
        <div class="article__newsletterWrapper__titleWrapper">
          <p class="article__newsletterWrapper__titleWrapper__subtitle">
            {{ subtitle }}
          </p>
          <h2 class="article__newsletterWrapper__titleWrapper__title">
            {{ title }}
          </h2>
        </div>
        <p class="article__newsletterWrapper__overview">{{ overview }}</p>
        <form
          class="article__newsletterWrapper__inputWrapper"
          #newsletterForm="ngForm"
          (ngSubmit)="handleNewsletterForm()"
        >
          <input
            class="article__newsletterWrapper__inputWrapper__input"
            id="newsletterEmail"
            pattern="^((\\w\\w+)[.\\-]?)+@(([0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3})|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"
            name="newsletterEmail"
            type="email"
            #newsletterEmail="ngModel"
            [(ngModel)]="emailInput"
            required
          />
          <label
            class="article__newsletterWrapper__inputWrapper__label"
            for="newsletterEmail"
            [ngClass]="{
              'article__newsletterWrapper__inputWrapper__label--active':
                emailInput.length > 0
            }"
            >{{ labelMessage }}
          </label>
          <button
            class="article__newsletterWrapper__inputWrapper__submit"
            type="submit"
          >
            {{ submitButton }}
          </button>
          <p
            [hidden]="newsletterEmail.valid || newsletterEmail.pristine"
            class="article__newsletterWrapper__inputWrapper__error"
          >
            {{ errorInput }}
          </p>
        </form>
      </div>
      <figure class="article__decorationWrapper">
        <img
          class="article__decorationWrapper__decoration rightDecoration"
          [src]="vectorImage"
          alt="decoration"
        />
      </figure>
    </article>
  `,
  styleUrls: ['./home-newsletter.component.scss'],
})
export class HomeNewsletterComponent implements OnInit {
  subtitle: string = 'nailissa'
  title: string = 'newsletter'
  overview: string =
    'Recevez gratuitement et automatiquement nos promotions en nous laissant votre email'
  submitButton: string = 'Souscrire à la Newsletter »'
  vectorImage: string = 'assets/images/logos/fancy-line-transparent-15.png'

  labelMessage: string = 'Renseignez votre adresse email : '
  emailInput: string = ''
  errorInput: string = 'Adresse mail non valide.'

  handleNewsletterForm() {
    console.log(this.emailInput.trim())
    this.emailInput = ''
    this.labelMessage = 'Souscription effectuée !'
    this.errorInput = ''
  }

  ngOnInit() {}
}
