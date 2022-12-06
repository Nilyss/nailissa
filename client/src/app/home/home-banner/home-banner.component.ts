import { Component } from '@angular/core'

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss'],
})
export class HomeBannerComponent {
  bannerPicture: string =
    'assets/images/meli/transparency/PXL_20220608_182359145.PORTRAIT.png'

  title: string = 'Site web en cours de construction.'
  subtitle: string =
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.'
}
