import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription, tap } from 'rxjs'
import { Provision } from '../../data/NgRx/models/provision'
import { ProvisionService } from '../../data/services/provision.service'

// NgRx
import { Store, select } from '@ngrx/store'
import { selectProvisionData } from '../../data/NgRx/controller/provision/provisionSelector'
import { ProvisionState } from '../../data/NgRx/controller/provision/provisionReducer'

@Component({
  selector: 'app-home-second-article',
  template: `
    <article *ngIf="provisions" id="prestations" class="article">
      <div class="article__modalWrapper">
        <app-home-time-picking
          [provisionsData]="provisions"
          [provisionId]="provisionId"
          (modalState)="modalState = $event"
          *ngIf="isModalDisplay && modalState !== false"
        ></app-home-time-picking>
      </div>
      <div
        class="article__titleWrapper"
        data-aos="fade-up"
        data-aos-duration="500"
        data-aos-easing="ease-out"
        data-aos-offset="500"
      >
        <p class="article__titleWrapper__subtitle">{{ subtitle }}</p>
        <h2 class="article__titleWrapper__title">{{ title }}</h2>
      </div>
      <ul
        class="article__cardsWrapper"
        data-aos="fade-up-right"
        data-aos-duration="500"
        data-aos-easing="ease-out"
        data-aos-offset="500"
      >
        <li
          *ngFor="let prestation of provisions"
          class="article__cardsWrapper__cards"
        >
          <figure class="imageWrapper">
            <img
              [src]="prestation.image"
              alt="prestation"
              class="imageWrapper__image"
            />
          </figure>
          <div class="article__cardsWrapper__cards__textWrapper">
            <h3 class="article__cardsWrapper__cards__textWrapper__name">
              {{ prestation.name }}
            </h3>
            <p class="article__cardsWrapper__cards__textWrapper__overview">
              {{ prestation.overview }}
            </p>
            <p class="article__cardsWrapper__cards__textWrapper__time">
              Durée: {{ prestation.time }}
            </p>
          </div>
          <p class="article__cardsWrapper__cards__price">
            Prix: {{ prestation.price }}
          </p>
          <div class="article__cardsWrapper__cards__orderWrapper">
            <button
              class="article__cardsWrapper__cards__orderWrapper__order"
              (click)="toggleModal($event, prestation._id)"
            >
              Planifier un rendez-vous
            </button>
          </div>
        </li>
      </ul>
    </article>
  `,
  styleUrls: ['./home-second-article.component.scss'],
})
export class HomeSecondArticleComponent implements OnInit, OnDestroy {
  isSubscription: Subscription | undefined
  subtitle: string = 'nos prestations'
  title: string = 'prothésiste ongulaire'
  provisions: Provision[]
  provisionId: string
  isModalDisplay: boolean = false

  toggleModal(event: Event, provisionId: string) {
    this.provisionId = provisionId
    this.isModalDisplay = true
    this.modalState = true
  }

  modalState: boolean

  getAllProvision() {
    this.isSubscription = this.store
      .pipe(
        select(selectProvisionData),
        tap((provisions) => (this.provisions = provisions.provision))
      )
      .subscribe()
  }
  constructor(
    private provisionService: ProvisionService,
    private store: Store<{ provisions: ProvisionState }>
  ) {}
  ngOnInit() {
    this.getAllProvision()
  }
  ngOnDestroy() {
    this.isSubscription?.unsubscribe()
  }
}
