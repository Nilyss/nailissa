import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-home-footer',
  template: `
    <div
      class="footerWrapper"
      data-aos="fade-up"
      data-aos-duration="500"
      data-aos-easing="ease-out"
      data-aos-offset="400"
    >
      <div class="footerWrapper__body">
        <div class="footerWrapper__body__leftSide">
          <div class="footerWrapper__body__leftSide__branding">
            <figure
              class="footerWrapper__body__leftSide__branding__logoWrapper"
            >
              <img
                class="footerWrapper__body__leftSide__branding__logoWrapper__logo"
                [src]="brandingLogo"
                alt="Branding Logo"
              />
            </figure>
            <h2 class="footerWrapper__body__leftSide__branding__brandingName">
              Nail<span
                class="footerWrapper__body__leftSide__branding__brandingName--secondColor"
                >issa</span
              >
            </h2>
          </div>
          <p class="footerWrapper__body__leftSide__overview">
            {{ overviewMessage }}
          </p>
        </div>

        <!-- ********** Right Side ********** -->

        <div class="footerWrapper__body__rightSide">
          <nav class="footerWrapper__body__rightSide__nav">
            <div class="footerWrapper__body__rightSide__nav__listWrapper">
              <h2
                class="footerWrapper__body__rightSide__nav__listWrapper__title"
              >
                {{ listTitleA }}
              </h2>
              <ul
                class="footerWrapper__body__rightSide__nav__listWrapper__title__ul"
              >
                <li
                  class="footerWrapper__body__rightSide__nav__listWrapper__title__ul__elements"
                >
                  {{ listAContent1 }}
                </li>
                <li
                  class="footerWrapper__body__rightSide__nav__listWrapper__title__ul__elements"
                >
                  {{ listAContent2 }}
                </li>
                <li
                  class="footerWrapper__body__rightSide__nav__listWrapper__title__ul__elements"
                >
                  {{ listAContent3 }}
                </li>
                <li
                  class="footerWrapper__body__rightSide__nav__listWrapper__title__ul__elements"
                >
                  {{ listAContent4 }}
                </li>
              </ul>
            </div>
            <div class="footerWrapper__body__rightSide__nav__listWrapper">
              <h2
                class="footerWrapper__body__rightSide__nav__listWrapper__title"
              >
                {{ listTitleB }}
              </h2>
              <ul
                class="footerWrapper__body__rightSide__nav__listWrapper__title__ul"
              >
                <li
                  class="footerWrapper__body__rightSide__nav__listWrapper__title__ul__elements"
                >
                  {{ listBContent1 }}
                </li>
                <li
                  class="footerWrapper__body__rightSide__nav__listWrapper__title__ul__elements"
                >
                  {{ listBContent2 }}
                </li>
                <li
                  class="footerWrapper__body__rightSide__nav__listWrapper__title__ul__elements"
                >
                  {{ listBContent3 }}
                </li>
                <li
                  class="footerWrapper__body__rightSide__nav__listWrapper__title__ul__elements"
                >
                  {{ listBContent4 }}
                </li>
              </ul>
            </div>
            <div class="footerWrapper__body__rightSide__nav__listWrapper">
              <h2
                class="footerWrapper__body__rightSide__nav__listWrapper__title"
              >
                {{ listTitleC }}
              </h2>
              <ul
                class="footerWrapper__body__rightSide__nav__listWrapper__title__ul"
              >
                <li
                  class="footerWrapper__body__rightSide__nav__listWrapper__title__ul__elements"
                >
                  {{ listCContent1 }}
                </li>
                <li
                  class="footerWrapper__body__rightSide__nav__listWrapper__title__ul__elements"
                >
                  {{ listCContent2 }}
                </li>
                <li
                  class="footerWrapper__body__rightSide__nav__listWrapper__title__ul__elements"
                >
                  {{ listCContent3 }}
                </li>
                <li
                  class="footerWrapper__body__rightSide__nav__listWrapper__title__ul__elements"
                >
                  {{ listCContent4 }}
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>

    <!-- ********** Footer ********** -->

    <div class="footerWrapper__footer">
      <ul class="footerWrapper__footer__ul">
        <li class="footerWrapper__footer__ul__elements">
          {{ footerContent1 }}
          <a
            class="footerWrapper__footer__ul__elements--link"
            href="https://ndecressac.fr"
            >{{ footerContent1Link }}</a
          >
        </li>
        <li class="footerWrapper__footer__ul__elements">
          {{ footerContent2 }}
        </li>
        <li class="footerWrapper__footer__ul__elements">
          {{ footerContent3 }}
        </li>
      </ul>
    </div>
  `,
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
