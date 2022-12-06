import { Component, OnInit } from '@angular/core'
import disableScroll from 'disable-scroll'
import AOS from 'aos'
@Component({
  selector: 'app-home',
  template: `
    <body class="body">
      <app-home-loader></app-home-loader>
      <header>
        <app-home-header></app-home-header>
      </header>
      <main>
        <section>
          <app-home-banner></app-home-banner>
        </section>
        <section>
          <app-home-first-article></app-home-first-article>
          <app-home-second-article></app-home-second-article>
        </section>
        <section>
          <app-home-link-cards></app-home-link-cards>
        </section>
        <section>
          <app-home-newsletter></app-home-newsletter>
          <app-home-contact></app-home-contact>
        </section>
      </main>
      <footer>
        <app-home-footer></app-home-footer>
      </footer>
      <app-back-to-top></app-back-to-top>
    </body>
  `,
  styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {
  private disableScrollWhileLoader() {
    disableScroll.on()
    setTimeout(enable, 3000)
    function enable() {
      disableScroll.off()
    }
  }

  constructor() {}
  ngOnInit() {
    this.disableScrollWhileLoader()
    AOS.init({
      disable: 'mobile',
    })
    AOS.refreshHard()
    AOS.refresh()
  }
}
