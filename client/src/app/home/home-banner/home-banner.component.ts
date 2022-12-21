import { Component } from '@angular/core'

@Component({
  selector: 'app-home-banner',
  template: `<article class="bannerArticle">
    <figure class="bannerArticle__pictureWrapper">
      <div class="bannerArticle__pictureWrapper__circle"></div>
      <img
        [src]="bannerPicture"
        alt="banner"
        class="bannerArticle__pictureWrapper__picture"
      />
    </figure>
    <div class="bannerArticle__contentWrapper">
      <h1 class="bannerArticle__contentWrapper__title">
        {{ title }}
      </h1>
      <p class="bannerArticle__contentWrapper__subtitle">{{ subtitle }}</p>
      <button class="bannerArticle__contentWrapper__button">
        Saiba Mais »
      </button>
    </div>
  </article> `,
  styleUrls: ['./home-banner.component.scss'],
})
export class HomeBannerComponent {
  bannerPicture: string =
    'assets/images/meli/transparency/PXL_20220608_182359145.PORTRAIT.png'

  title: string = 'Site web en cours de construction.'
  subtitle: string =
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.'
}
