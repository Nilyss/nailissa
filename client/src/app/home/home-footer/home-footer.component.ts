import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-home-footer',
  templateUrl: './home-footer.component.html',
  styleUrls: ['./home-footer.component.scss'],
})
export class HomeFooterComponent implements OnInit {
  brandingLogo: string = 'assets/images/logos/pumps.png'
  overviewMessage: string =
    '  Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.  Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
  listTitleA: string = 'Lorem ipsum'
  listTitleB: string = 'arcu felis'
  listTitleC: string = 'integer feugiat'

  listAContent1: string = 'dictum sit amet'
  listAContent2: string = 'dictum sit amet'
  listAContent3: string = 'dictum sit amet'
  listAContent4: string = 'dictum sit amet'

  listBContent1: string = 'sociis natoque penatibus'
  listBContent2: string = 'sociis natoque penatibus'
  listBContent3: string = 'sociis natoque penatibus'
  listBContent4: string = 'sociis natoque penatibus'

  listCContent1: string = 'non sodales neque'
  listCContent2: string = 'non sodales neque'
  listCContent3: string = 'non sodales neque'
  listCContent4: string = 'non sodales neque'

  footerContent1: string = '©2022 Nailissa |  Made by '
  footerContent1Link: string = ' ndecressac®'
  footerContent2: string = 'mauris cursus mattis molestie a iaculis at.'
  footerContent3: string = 'mauris nunc congue'

  constructor() {}

  ngOnInit() {}
}
