import { Component } from '@angular/core'
import { AnimationOptions } from 'ngx-lottie'
import { AnimationItem } from 'lottie-web'

@Component({
  selector: 'app-home-loader',
  template: ` <div class="loader">
    <div class="loader__lottie">
      <ng-lottie
        [options]="option"
        (animationCreated)="onAnimate($event)"
      ></ng-lottie>
    </div>
  </div>`,
  styleUrls: ['home-loader.components.scss'],
})
export class HomeLoaderComponent {
  option: AnimationOptions = {
    path: '/assets/lottie/produit-anim.json',
  }
  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem)
  }
}
