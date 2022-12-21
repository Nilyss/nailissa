import { Component, OnInit } from '@angular/core'
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser'
import EmailJsConfig from '../../utils/EmailJsConfig'

@Component({
  selector: 'app-home-contact',
  template: `
    <article id="contacts" class="article">
      <!-- ********** LEFT SIDE ********** -->

      <div
        class="article__leftWrapper"
        data-aos="fade-down-right"
        data-aos-duration="500"
        data-aos-easing="ease-out"
        data-aos-offset="250"
      >
        <div class="article__leftWrapper__titleWrapper">
          <p class="article__leftWrapper__titleWrapper__subtitle">
            {{ leftSubtitle }}
          </p>
          <h2 class="article__leftWrapper__titleWrapper__title">
            {{ leftTitle }}
          </h2>
        </div>
        <p class="article__leftWrapper__overview">{{ overview }}</p>
        <ul class="article__leftWrapper__listWrapper">
          <li class="article__leftWrapper__listWrapper__contact">
            <figure
              class="article__leftWrapper__listWrapper__contact__iconWrapper"
            >
              <img
                [src]="phoneCallIcon"
                alt="phone call icon"
                class="article__leftWrapper__listWrapper__contact__iconWrapper__logo"
              />
            </figure>
            <a
              class="article__leftWrapper__listWrapper__contact__link"
              href="tel: +33666327763"
              title="Ligne direct"
            >
              {{ phoneNumber }}
            </a>
          </li>
          <li class="article__leftWrapper__listWrapper__contact">
            <figure
              class="article__leftWrapper__listWrapper__contact__iconWrapper"
            >
              <img
                [src]="whatsappIcon"
                alt="phone call icon"
                class="article__leftWrapper__listWrapper__contact__iconWrapper__logo"
              />
            </figure>
            <a
              class="article__leftWrapper__listWrapper__contact__link"
              href="https://wa.me/0666327763"
              title="Contacter sur What's app"
            >
              {{ phoneNumber }}
            </a>
          </li>
          <li class="article__leftWrapper__listWrapper__contact">
            <figure
              class="article__leftWrapper__listWrapper__contact__iconWrapper"
            >
              <img
                [src]="emailIcon"
                alt="phone call icon"
                class="article__leftWrapper__listWrapper__contact__iconWrapper__logo"
              />
            </figure>
            <a
              class="article__leftWrapper__listWrapper__contact__link"
              href="mailto: contact@nailissa.fr"
              title="Envoyer un mail"
            >
              {{ emailAddress }}
            </a>
          </li>
        </ul>
      </div>

      <!-- ********** RIGHT SIDE ********** -->

      <div
        class="article__rightWrapper"
        data-aos="fade-up-left"
        data-aos-duration="500"
        data-aos-easing="ease-out"
        data-aos-offset="700"
      >
        <form
          #sendContactForm="ngForm"
          (ngSubmit)="sendEmail($event)"
          class="article__rightWrapper__from"
        >
          <h2 class="article__rightWrapper__from__title">
            Formulaire de contact
          </h2>
          <div class="article__rightWrapper__from__inputsWrapper">
            <input
              id="contactName"
              pattern="^(([A-Za-z]+[\\-\\']?)*([A-Za-z]+)?\\s)+([A-Za-z]+[\\-\\']?)*([A-Za-z]+)?$"
              name="contactName"
              [(ngModel)]="contactNameInput"
              #contactName="ngModel"
              required
              type="text"
              class="article__rightWrapper__from__inputsWrapper__name"
            />
            <label
              for="contactName"
              class="article__rightWrapper__from__inputsWrapper__name--label label"
              [ngClass]="{
                'article__rightWrapper__from__inputsWrapper__name--label--active':
                  contactNameInput.length > 0
              }"
              >{{ contactLabelNameLabel }}</label
            >
            <div class="article__rightWrapper__from__inputsWrapper__coordinate">
              <input
                id="contactPhone"
                pattern="(0|\\\\+33|0033)[1-9][0-9]{8}"
                name="contactPhone"
                [(ngModel)]="contactPhoneInput"
                #contactPhone="ngModel"
                required
                class="article__rightWrapper__from__inputsWrapper__coordinate__phone"
                type="tel"
              />
              <label
                for="contactPhone"
                [ngClass]="{
                  'article__rightWrapper__from__inputsWrapper__coordinate__phone--label--active':
                    contactPhoneInput.length > 0
                }"
                class="article__rightWrapper__from__inputsWrapper__coordinate__phone--label label"
                >{{ contactPhoneLabel }}</label
              >
              <input
                id="contactEmail"
                pattern="^((\\w\\w+)[.\\-]?)+@(([0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3})|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"
                name="contactEmail"
                [(ngModel)]="contactEmailInput"
                #contactEmail="ngModel"
                required
                class="article__rightWrapper__from__inputsWrapper__coordinate__email"
                type="email"
              />
              <label
                for="contactEmail"
                [ngClass]="{
                  'article__rightWrapper__from__inputsWrapper__coordinate__email--label--active':
                    contactEmailInput.length > 0
                }"
                class="article__rightWrapper__from__inputsWrapper__coordinate__email--label label"
                >{{ contactMailLabel }}</label
              >
            </div>
            <textarea
              id="contactMessage"
              name="contactMessage"
              [(ngModel)]="contactMessageInput"
              #contactMessage="ngModel"
              required
              class="article__rightWrapper__from__inputsWrapper__textArea"
            ></textarea>
            <label
              for="contactMessage"
              [ngClass]="{
                'article__rightWrapper__from__inputsWrapper__textArea--label--active':
                  contactMessageInput.length > 0
              }"
              class="article__rightWrapper__from__inputsWrapper__textArea--label label"
              >{{ contactMessageLabel }}</label
            >
            <div
              class="article__rightWrapper__from__inputsWrapper__buttonWrapper"
            >
              <button
                type="submit"
                [disabled]="!sendContactForm.form.valid"
                class="article__rightWrapper__from__inputsWrapper__buttonWrapper__button"
              >
                {{ submitButton }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </article>
  `,
  styleUrls: ['./home-contact.component.scss'],
})
export class HomeContactComponent implements OnInit {
  leftSubtitle: string = 'Des questions ?'
  leftTitle: string = 'Contactez nous'
  overview: string =
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.'
  phoneNumber: string = '+33(0)6.66.32.77.63'
  emailAddress: string = 'contact@nailissa.fr'
  phoneCallIcon: string = 'assets/images/logos/phone.png'
  whatsappIcon: string = 'assets/images/logos/whatsapp.png'
  emailIcon: string = 'assets/images/logos/email.png'
  submitButton: string = ' Envoyer le message »'

  contactLabelNameLabel: string = 'Nom complet :'
  contactPhoneLabel: string = "Téléphone / What's app :"
  contactMailLabel: string = 'Adresse email :'
  contactMessageLabel: string = 'Message :'

  contactNameInput: string = ''
  contactPhoneInput: string = ''
  contactEmailInput: string = ''
  contactMessageInput: string = ''

  public sendEmail(e: Event) {
    emailjs
      .sendForm(
        EmailJsConfig.serviceID,
        EmailJsConfig.templateID,
        e.target as HTMLFormElement,
        EmailJsConfig.publicKey
      )
      .then(
        (result: EmailJSResponseStatus) => {
          console.log(result.text)
          this.contactNameInput = ''
          this.contactPhoneInput = ''
          this.contactEmailInput = ''
          this.contactMessageInput = ''
          alert('Message envoyé avec succès !')
        },
        (error) => {
          console.log(error.text)
          alert('Une erreur est survenu veuillez réessayer plus tard')
        }
      )
  }

  ngOnInit() {}
}
