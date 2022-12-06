import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-home-newsletter',
  templateUrl: './home-newsletter.component.html',
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
