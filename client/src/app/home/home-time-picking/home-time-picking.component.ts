import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
  Input,
} from '@angular/core'
import { CalendarService } from '../calendar.service'
import { Subscription } from 'rxjs'
import { Provision } from '../provision'

@Component({
  selector: 'app-home-time-picking',
  templateUrl: './home-time-picking.component.html',
  styleUrls: ['./home-time-picking.component.scss'],
})
export class HomeTimePickingComponent implements OnInit, OnDestroy {
  @Input() provisionsData: Provision[]
  @Input() provisionId: string
  @Output() public modalState = new EventEmitter()
  provision: {
    _id: string
    name: string
    price: string
    overview: string
    image: string
    time: string
  }
  isSubscribed: Subscription | undefined
  modalTitle: string = 'Choisissez une date et un créneaux horaire'
  modalSubmitButton: string = 'Valider le rendez-vous'
  modalCancelButton: string = 'Annuler'

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
    const data = {
      date: this.datePickInput,
      time: this.selectedTime,
    }
    this.isSubscribed = this.calendarService
      .bookingDateRequest(data.date, data.time)
      .subscribe()

    this.modalState.emit(false)
    alert('Saved Date')
  }

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.getProvisionDatasById()
  }
  ngOnDestroy() {
    this.isSubscribed?.unsubscribe()
  }
}
