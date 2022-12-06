import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'

// components
import { HomeComponent } from './home.component'
import { HomeHeaderComponent } from './home-header/home-header.component'
import { HomeFooterComponent } from './home-footer/home-footer.component'
import { HomeBannerComponent } from './home-banner/home-banner.component'
import { HomeFirstArticleComponent } from './home-first-article/home-first-article.component'
import { HomeSecondArticleComponent } from './home-second-article/home-second-article.component'
import { HomeLinkCardsComponent } from './home-link-cards/home-link-cards.component'
import { HomeNewsletterComponent } from './home-newsletter/home-newsletter.component'
import { HomeContactComponent } from './home-contact/home-contact.component'
import { FormsModule } from '@angular/forms'
import { BackToTopComponent } from './back-to-top/back-to-top.component'
import { HomeLoaderComponent } from './home-loader/home-loader.component'
import { HomeTimePickingComponent } from './home-time-picking/home-time-picking.component'
import { HomeHeaderUserModalComponent } from './home-header/home-header-user-modal/home-header-user-modal.component'
import { LottieComponent } from 'ngx-lottie'

const homeRoutes: Routes = [{ path: '', component: HomeComponent }]

@NgModule({
  declarations: [
    HomeComponent,
    HomeHeaderComponent,
    HomeFooterComponent,
    HomeBannerComponent,
    HomeFirstArticleComponent,
    HomeSecondArticleComponent,
    HomeLinkCardsComponent,
    HomeNewsletterComponent,
    HomeContactComponent,
    BackToTopComponent,
    HomeLoaderComponent,
    HomeTimePickingComponent,
    HomeHeaderUserModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes),
    FormsModule,
    HttpClientModule,
    LottieComponent,
  ],
  exports: [HomeHeaderComponent, HomeFooterComponent],
})
export class HomeModule {}
