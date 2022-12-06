import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-home-link-cards',
  templateUrl: './home-link-cards.component.html',
  styleUrls: ['./home-link-cards.component.scss'],
})
export class HomeLinkCardsComponent implements OnInit {
  leftPicture: string =
    'assets/images/pexels/pexels-cottonbro-studio-3993115.jpg'
  rightPicture: string =
    'assets/images/pexels/pexels-suzy-hazelwood-1328379.jpg'

  ngOnInit() {}
}
