import { Component } from '@angular/core'

@Component({
  selector: 'app-authentication',
  template: `
    <body class="body">
      <header>
        <app-home-header></app-home-header>
      </header>
      <main class="main">
        <section class="main__section">
          <article class="main__section__article">
            <app-authentication-form></app-authentication-form>
          </article>
        </section>
      </main>
      <footer>
        <app-home-footer></app-home-footer>
      </footer>
    </body>
  `,
  styles: [
    '.body {overflow-x: hidden}',
    '.main__section__article {display: flex; justify-content: center; align-items: center;}',
  ],
})
export class AuthenticationComponent {}
