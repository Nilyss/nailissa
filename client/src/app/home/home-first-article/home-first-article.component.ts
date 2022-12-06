import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-home-first-article',
  templateUrl: './home-first-article.component.html',
  styleUrls: ['./home-first-article.component.scss'],
})
export class HomeFirstArticleComponent implements OnInit {
  subtitle: string = 'nos services'
  title: string = 'prothésiste ongulaire'
  overview: string =
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Velit officia consequat duis enim velit mollit'
  prestationImageA: string = 'assets/images/logos/nail-file.png'
  prestationTitleA: string = 'Amet minim mollit'
  prestationMessageA: string =
    'Amet minim mollit non deserunt ullam co est sit.'
  prestationImageB: string = 'assets/images/logos/nail-polish.png'
  prestationTitleB: string = 'Amet minim mollit'
  prestationMessageB: string =
    'Amet minim mollit non deserunt ullam co est sit.'
  prestationImageC: string = 'assets/images/logos/nail-dryer.png'
  prestationTitleC: string = 'Amet minim mollit'
  prestationMessageC: string =
    'Amet minim mollit non deserunt ullam co est sit.'
  prestationImageD: string = 'assets/images/logos/nail.png'
  prestationTitleD: string = 'Amet minim mollit'
  prestationMessageD: string =
    'Amet minim mollit non deserunt ullam co est sit.'

  prestationPicture: string =
    'assets/images/pexels/pexels-henry-&-co-11842624.jpg'

  ngOnInit() {}
}
