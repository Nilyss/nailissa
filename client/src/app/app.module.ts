import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

// modules
import { LottieModule } from 'ngx-lottie'
export function playerFactory(): any {
  return import('lottie-web')
}
import { HomeModule } from './home/home.module'
import { AuthenticationModule } from './authentication/authentication.module'

// ********** NGRX **********
import { StoreModule } from '@ngrx/store'
// ***** Reducer *****
import { UserReducer } from './data/NgRx/controller/user/userReducer'
import { logMetaReducer } from './data/NgRx/metaReducers/log'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    AuthenticationModule,
    LottieModule.forRoot({ player: playerFactory }),
    StoreModule.forRoot(
      {
        user: UserReducer,
      },
      { metaReducers: [logMetaReducer] }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
