import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

// Models
import { User } from '../../data/NgRx/models/user'

// NgRx
import { Store } from '@ngrx/store'
import { UserState } from '../../data/NgRx/controller/user/userReducer'
import { selectUserBookedDate } from '../../data/NgRx/controller/user/userSelector'

@Component({
  selector: 'app-authentication-booked-date',
  template: `<body class="body">
    <header>
      <app-home-header></app-home-header>
    </header>
    <main>
      <section *ngIf="bookedDate._id === undefined" class="booked">
        <div class="booked__wrapper">
          <div class="booked__wrapper__titleWrapper">
            <h2 class="booked__wrapper__titleWrapper__title">
              {{ componentTitleFalse }}
            </h2>
          </div>
          <div class="booked__wrapper__buttonWrapper">
            <div class="booked__wrapper__buttonWrapper__button">
              <a
                routerLink=""
                fragment="prestations"
                class="headerWrapper__navWrapper__branding__buttonWrapper"
              >
                <button
                  class="headerWrapper__navWrapper__branding__buttonWrapper__button"
                >
                  {{ bookButton }}
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section *ngIf="bookedDate._id" class="booked">
        <div class="booked__wrapper">
          <div class="booked__wrapper__titleWrapper">
            <h2 class="booked__wrapper__titleWrapper__title">
              {{ componentTitleTrue }}
            </h2>
          </div>
        </div>
        <div class="booked__wrapper__prestationPicture">
          <figure class="booked__wrapper__prestationPicture__wrapper">
            <img
              class="booked__wrapper__prestationPicture__wrapper__image"
              src="{{ bookedDate.provision.image }}"
              alt="prestation"
            />
          </figure>
        </div>
        <div class="booked__wrapper__bodyWrapper">
          <ul class="booked__wrapper__bodyWrapper__firstList list">
            <li class="list__elements">
              <span class="list__elements--title">Jour du rendez-vous : </span>
              {{ bookedDate.day }}
            </li>
            <li class="list__elements">
              <span class="list__elements--title">
                Heure du rendez-vous :
              </span>
              {{ bookedDate.hour }}
            </li>
          </ul>
          <ul class="booked__wrapper__bodyWrapper__secondList list">
            <li class="list__elements">
              <span class="list__elements--title"> Prestation : </span
              >{{ bookedDate.provision.name }}
            </li>
            <li class="list__elements">
              <span class="list__elements--title">Description : </span
              >{{ bookedDate.provision.overview }}
            </li>
            <li class="list__elements">
              <span class="list__elements--title">
                Durée de la prestation : </span
              >{{ bookedDate.provision.time }}
            </li>
            <li class="list__elements">
              <span class="list__elements--title">
                Prix de la prestation : </span
              >{{ bookedDate.provision.price }}
            </li>
            <li class="list__elements">
              <span class="list__elements--title">
                Référence du rendez-vous : </span
              >{{ bookedDate._id }}
            </li>
          </ul>
        </div>
      </section>
    </main>
    <footer>
      <app-home-footer></app-home-footer>
    </footer>
  </body> `,
  styleUrls: ['./authentication-booked-date.component.scss'],
})
export class AuthenticationBookedDateComponent implements OnInit, OnDestroy {
  isSubscribed: Subscription | undefined
  bookedDate: User['bookedDate']
  componentTitleTrue: string = 'Mon rendez-vous :'
  componentTitleFalse: string = 'Aucun rendez-vous.'
  bookButton: string = 'Planifier un rendez-vous'

  getBookedDate() {
    this.isSubscribed = this.store
      .select(selectUserBookedDate)
      .subscribe((bookedDate) => (this.bookedDate = bookedDate))
  }

  constructor(private store: Store<{ user: UserState }>) {}
  ngOnInit() {
    this.getBookedDate()
  }
  ngOnDestroy() {
    this.isSubscribed?.unsubscribe()
  }
}
