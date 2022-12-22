import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { HomeModule } from '../home/home.module'

// components
import { AuthenticationComponent } from './authentication.component'
import { AuthenticationFormComponent } from './authentication-form/authentication-form.component'
import { AuthenticationProfileComponent } from './authentication-profile/authentication-profile.component'
import { AuthenticationBookedDateComponent } from './authentication-booked-date/authentication-booked-date.component'
import { HomeGuard } from '../routes/routeGuards/homeGuard'

const authenticationRoutes: Routes = [
  { path: 'account/signup', component: AuthenticationComponent },
  { path: 'account/login', component: AuthenticationComponent },
  {
    path: 'account/profile',
    component: AuthenticationProfileComponent,
    canActivate: [HomeGuard],
  },
  {
    path: 'account/Booked',
    component: AuthenticationBookedDateComponent,
    canActivate: [HomeGuard],
  },
]
@NgModule({
  declarations: [
    AuthenticationComponent,
    AuthenticationFormComponent,
    AuthenticationProfileComponent,
    AuthenticationBookedDateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(authenticationRoutes),
    FormsModule,
    HttpClientModule,
    HomeModule,
  ],
})
export class AuthenticationModule {}
