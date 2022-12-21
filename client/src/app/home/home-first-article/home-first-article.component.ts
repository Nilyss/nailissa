import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-home-first-article',
  template: `
    <article id="services" class="article">
      <div class="article__leftWrapper">
        <div
          class="article__leftWrapper__title"
          data-aos="fade-right"
          data-aos-duration="500"
          data-aos-easing="ease-out"
          data-aos-offset="400"
        >
          <p class="article__leftWrapper__title__subtitle">{{ subtitle }}</p>
          <h2 class="article__leftWrapper__title__title">{{ title }}</h2>
        </div>
        <div
          class="article__leftWrapper__overviewWrapper"
          data-aos="fade-left"
          data-aos-duration="500"
          data-aos-easing="ease-out"
          data-aos-offset="400"
        >
          <p class="article__leftWrapper__overviewWrapper__overview">
            {{ overview }}
          </p>
        </div>
        <div
          class="article__leftWrapper__prestationWrapper"
          data-aos="fade-up-right"
          data-aos-duration="500"
          data-aos-easing="ease-out"
          data-aos-offset="600"
        >
          <ul class="article__leftWrapper__prestationWrapper__ul">
            <li class="article__leftWrapper__prestationWrapper__ul__prestation">
              <figure
                class="article__leftWrapper__prestationWrapper__ul__prestation__imageWrapper"
              >
                <img
                  class="article__leftWrapper__prestationWrapper__ul__prestation__imageWrapper__image"
                  [src]="prestationImageA"
                  alt=""
                />
              </figure>
              <div
                class="article__leftWrapper__prestationWrapper__ul__prestation__textWrapper"
              >
                <h3
                  class="article__leftWrapper__prestationWrapper__ul__prestation__textWrapper__title"
                >
                  {{ prestationTitleA }}
                </h3>
                <p
                  class="article__leftWrapper__prestationWrapper__ul__prestation__textWrapper__message"
                >
                  {{ prestationMessageA }}
                </p>
              </div>
            </li>
            <li class="article__leftWrapper__prestationWrapper__ul__prestation">
              <figure
                class="article__leftWrapper__prestationWrapper__ul__prestation__imageWrapper"
              >
                <img
                  class="article__leftWrapper__prestationWrapper__ul__prestation__imageWrapper__image"
                  [src]="prestationImageB"
                  alt=""
                />
              </figure>
              <div
                class="article__leftWrapper__prestationWrapper__ul__prestation__textWrapper"
              >
                <h3
                  class="article__leftWrapper__prestationWrapper__ul__prestation__textWrapper__title"
                >
                  {{ prestationTitleB }}
                </h3>
                <p
                  class="article__leftWrapper__prestationWrapper__ul__prestation__textWrapper__message"
                >
                  {{ prestationMessageB }}
                </p>
              </div>
            </li>
          </ul>
          <ul class="article__leftWrapper__prestationWrapper__ul">
            <li class="article__leftWrapper__prestationWrapper__ul__prestation">
              <figure
                class="article__leftWrapper__prestationWrapper__ul__prestation__imageWrapper"
              >
                <img
                  class="article__leftWrapper__prestationWrapper__ul__prestation__imageWrapper__image"
                  [src]="prestationImageC"
                  alt=""
                />
              </figure>
              <div
                class="article__leftWrapper__prestationWrapper__ul__prestation__textWrapper"
              >
                <h3
                  class="article__leftWrapper__prestationWrapper__ul__prestation__textWrapper__title"
                >
                  {{ prestationTitleC }}
                </h3>
                <p
                  class="article__leftWrapper__prestationWrapper__ul__prestation__textWrapper__message"
                >
                  {{ prestationMessageC }}
                </p>
              </div>
            </li>
            <li class="article__leftWrapper__prestationWrapper__ul__prestation">
              <figure
                class="article__leftWrapper__prestationWrapper__ul__prestation__imageWrapper"
              >
                <img
                  class="article__leftWrapper__prestationWrapper__ul__prestation__imageWrapper__image"
                  [src]="prestationImageD"
                  alt=""
                />
              </figure>
              <div
                class="article__leftWrapper__prestationWrapper__ul__prestation__textWrapper"
              >
                <h3
                  class="article__leftWrapper__prestationWrapper__ul__prestation__textWrapper__title"
                >
                  {{ prestationTitleD }}
                </h3>
                <p
                  class="article__leftWrapper__prestationWrapper__ul__prestation__textWrapper__message"
                >
                  {{ prestationMessageD }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="article__rightWrapper">
        <figure
          class="article__rightWrapper__imageWrapper"
          data-aos="fade-left"
          data-aos-duration="500"
          data-aos-easing="ease-out"
          data-aos-offset="500"
        >
          <img
            [src]="prestationPicture"
            alt="prestation"
            class="article__rightWrapper__imageWrapper__image"
          />
        </figure>
      </div>
    </article>
  `,
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
