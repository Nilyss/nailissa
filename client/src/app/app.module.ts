import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
// modules
import { LottieModule } from 'ngx-lottie'
import player from 'lottie-web'
export function playerFactory(): any {
  return import('lottie-web')
}

import { HomeModule } from './home/home.module'
import { AuthenticationModule } from './authentication/authentication.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    AuthenticationModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
