import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-home-second-article',
  templateUrl: './home-second-article.component.html',
  styleUrls: ['./home-second-article.component.scss'],
})
export class HomeSecondArticleComponent implements OnInit {
  subtitle: string = 'nos prestations'
  title: string = 'prothésiste ongulaire'

  data = [
    {
      title: 'prestation A',
      message: 'Amet minim mollit non deserunt ullam coet minim mollit.',
      price: 90,
    },
    {
      title: 'prestation B',
      message: 'Amet minim mollit non deserunt ullam coet minim mollit.',
      price: 80,
    },
    {
      title: 'prestation C',
      message: 'Amet minim mollit non deserunt ullam coet minim mollit.',
      price: 80,
    },
    {
      title: 'prestation D',
      message: 'Amet minim mollit non deserunt ullam coet minim mollit.',
      price: 50,
    },
    {
      title: 'prestation E',
      message: 'Amet minim mollit non deserunt ullam coet minim mollit.',
      price: 50,
    },
    {
      title: 'prestation F',
      message: 'Amet minim mollit non deserunt ullam coet minim mollit.',
      price: 40,
    },
    {
      title: 'prestation G',
      message: 'Amet minim mollit non deserunt ullam coet minim mollit.',
      price: 40,
    },
    {
      title: 'prestation H',
      message: 'Amet minim mollit non deserunt ullam coet minim mollit.',
      price: 40,
    },
  ]

  getPrestations = this.data.map((prestation) => prestation)

  isModalDisplay: boolean = false

  toggleModal(e) {
    this.isModalDisplay = true
    this.modalState = true
  }

  modalState: boolean

  constructor() {}
  ngOnInit() {}
}
