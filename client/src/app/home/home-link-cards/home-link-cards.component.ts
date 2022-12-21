import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-home-link-cards',
  template: `
    <article id="articles" class="article">
      <div class="article__leftWrapper">
        <figure
          class="article__leftWrapper__imageWrapper"
          data-aos="fade-right"
          data-aos-duration="500"
          data-aos-easing="ease-out"
          data-aos-offset="400"
        >
          <img
            class="article__leftWrapper__imageWrapper__picture"
            [src]="leftPicture"
            alt="article"
          />
        </figure>
        <div class="article__leftWrapper__content">
          <div
            class="article__leftWrapper__content__titleWrapper"
            data-aos="fade-right"
            data-aos-duration="500"
            data-aos-easing="ease-out"
            data-aos-offset="350"
          >
            <p class="article__leftWrapper__content__titleWrapper__subtitle">
              egestas integer
            </p>
            <h2 class="article__leftWrapper__content__titleWrapper__title">
              sit amet aliquam
            </h2>
          </div>
          <p class="article__leftWrapper__content__overview">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet.
          </p>
          <div
            class="article__leftWrapper__content__buttonWrapper"
            data-aos="fade-right"
            data-aos-duration="500"
            data-aos-easing="ease-out"
            data-aos-offset="360"
          >
            <button
              class="article__leftWrapper__content__buttonWrapper__button"
            >
              Plus d'information »
            </button>
          </div>
        </div>
      </div>
      <div class="article__rightWrapper">
        <figure
          class="article__rightWrapper__imageWrapper"
          data-aos="fade-left"
          data-aos-duration="500"
          data-aos-easing="ease-out"
          data-aos-offset="400"
        >
          <img
            class="article__rightWrapper__imageWrapper__picture"
            [src]="rightPicture"
            alt="article"
          />
        </figure>
        <div class="article__rightWrapper__content">
          <div
            class="article__rightWrapper__content__titleWrapper"
            data-aos="fade-left"
            data-aos-duration="500"
            data-aos-easing="ease-out"
            data-aos-offset="350"
          >
            <p class="article__rightWrapper__content__titleWrapper__subtitle">
              egestas integer
            </p>
            <h2 class="article__rightWrapper__content__titleWrapper__title">
              sit amet aliquam
            </h2>
          </div>
          <p class="article__rightWrapper__content__overview">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet.
          </p>
          <div
            class="article__rightWrapper__content__buttonWrapper"
            data-aos="fade-left"
            data-aos-duration="500"
            data-aos-easing="ease-out"
            data-aos-offset="360"
          >
            <button
              class="article__rightWrapper__content__buttonWrapper__button"
            >
              Plus d'information »
            </button>
          </div>
        </div>
      </div>
    </article>
  `,
  styleUrls: ['./home-link-cards.component.scss'],
})
export class HomeLinkCardsComponent implements OnInit {
  leftPicture: string =
    'assets/images/pexels/pexels-cottonbro-studio-3993115.jpg'
  rightPicture: string =
    'assets/images/pexels/pexels-suzy-hazelwood-1328379.jpg'

  ngOnInit() {}
}
