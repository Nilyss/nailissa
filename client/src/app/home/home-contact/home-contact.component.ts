import { Component, OnInit } from '@angular/core'
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser'
import EmailJsConfig from '../../utils/EmailJsConfig'

@Component({
  selector: 'app-home-contact',
  templateUrl: './home-contact.component.html',
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
