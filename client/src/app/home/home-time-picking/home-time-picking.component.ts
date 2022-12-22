import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
  Input,
} from '@angular/core'
import { Subscription, switchMap, tap } from 'rxjs'

// NgRx
import * as ActionUsers from '../../data/NgRx/controller/user/userAction'

// Models
import { User } from '../../data/NgRx/models/user'
import { Provision } from '../../data/NgRx/models/provision'

// Services
import { UserService } from '../../data/services/user.service'
import { Store } from '@ngrx/store'
import { UserState } from '../../data/NgRx/controller/user/userReducer'

@Component({
  selector: 'app-home-time-picking',
  template: `
    <div
      class="timePickingModal"
      data-aos="fade-down-left"
      data-aos-duration="500"
      data-aos-easing="ease-out"
    >
      <div class="timePickingModal__Wrapper">
        <div class="timePickingModal__Wrapper__titleWrapper">
          <h3 class="timePickingModal__Wrapper__titleWrapper__title">
            {{ modalTitle }}
          </h3>
          <p class="timePickingModal__Wrapper__titleWrapper__prestationName">
            {{ provision.name }}
          </p>
          <p
            class="timePickingModal__Wrapper__titleWrapper__prestationDuration"
          >
            {{ provision.time }} — {{ provision.price }}
          </p>
        </div>
        <form
          #sendDatePickingForm="ngForm"
          (ngSubmit)="saveDatePicked($event)"
          class="timePickingModal__Wrapper__bodyWrapper"
        >
          <div class="timePickingModal__Wrapper__bodyWrapper__dateInputWrapper">
            <input
              id="datePick"
              name='"datePick'
              [(ngModel)]="datePickInput"
              #datePick="ngModel"
              required
              class="timePickingModal__Wrapper__bodyWrapper__dateInputWrapper__input"
              type="date"
            />
          </div>
          <div class="timePickingModal__Wrapper__bodyWrapper__timeWrapper">
            <ul
              class="timePickingModal__Wrapper__bodyWrapper__timeWrapper__list"
            >
              <li
                *ngFor="let time of getHours; let i = index"
                [id]="i"
                class="timePickingModal__Wrapper__bodyWrapper__timeWrapper__list__time"
                [class.active]="selectedIndex === i"
                (click)="setTimeIndex(i)"
              >
                {{ time }}
              </li>
            </ul>
          </div>
          <div class="timePickingModal__Wrapper__bodyWrapper__submitWrapper">
            <button
              class="timePickingModal__Wrapper__bodyWrapper__submitWrapper__button"
            >
              {{ modalSubmitButton }}
            </button>
            <button
              (click)="closeModal()"
              class="timePickingModal__Wrapper__bodyWrapper__submitWrapper__button--cancel"
            >
              {{ modalCancelButton }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./home-time-picking.component.scss'],
})
export class HomeTimePickingComponent implements OnInit, OnDestroy {
  @Input() provisionsData: Provision[]
  @Input() provisionId: string
  @Output() public modalState = new EventEmitter()
  provision: User['bookedDate']['provision']
  isSubscribed: Subscription | undefined
  modalTitle: string = 'Choisissez une date et un créneaux horaire'
  modalSubmitButton: string = 'Valider le rendez-vous'
  modalCancelButton: string = 'Annuler'
  userId: string

  // target a date & time
  datePickInput: Date
  selectedIndex: number = null
  selectedTime: string

  data = [
    { property: '14h00' },
    { property: '15h00' },
    { property: '16h00' },
    { property: '17h00' },
  ]

  getHours = this.data.map((hours) => hours.property)

  // ********** function **********
  setTimeIndex(index) {
    this.selectedIndex = index
    this.selectedTime = document.getElementById(index).innerText
  }
  getProvisionDatasById() {
    this.provisionsData.find((provisions) => {
      if (provisions._id === this.provisionId) this.provision = provisions
    })
  }

  closeModal() {
    this.modalState.emit(false)
  }

  saveDatePicked(event: Event) {
    const bookedDate: User['bookedDate'] = {
      _id: '',
      day: this.datePickInput,
      hour: this.selectedTime,
      provision: this.provision,
    }

    this.isSubscribed = this.userService
      .getConnectedUserId()
      .pipe(
        // Save userId for futur get Request in script
        tap((userId: string) => (this.userId = userId)),
        // Save the bookedDate in DB
        switchMap((userId: string) =>
          this.userService.editConnectedUserBookedDate(userId, bookedDate)
        ),
        // Get request for getting the provision ID generate by mongoDB, and refresh user State with good info
        switchMap(() =>
          this.userService.getConnectedUserData(this.userId).pipe(
            tap((user) =>
              this.store.dispatch(
                ActionUsers.getUserData({
                  user,
                  isHomePageVisited: true,
                })
              )
            )
          )
        )
      )
      .subscribe(() => {
        this.closeModal()
        alert(
          `Rendez-vous pris pour le ${bookedDate.day} à ${bookedDate.hour} !`
        )
      })
  }

  constructor(
    private userService: UserService,
    private store: Store<{ user: UserState }>
  ) {}

  ngOnInit() {
    this.getProvisionDatasById()
  }
  ngOnDestroy() {
    this.isSubscribed?.unsubscribe()
  }
}
