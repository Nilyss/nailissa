import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core'
import { CalendarService } from '../calendar.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-home-time-picking',
  templateUrl: './home-time-picking.component.html',
  styleUrls: ['./home-time-picking.component.scss'],
})
export class HomeTimePickingComponent implements OnInit, OnDestroy {
  @Output() public modalState = new EventEmitter()
  isSubscribed: Subscription | undefined
  modalTitle: string = 'Choisissez une date et un créneaux horaire'
  modalSubmitButton: string = 'Valider le rendez-vous'
  modalCancelButton: string = 'Annuler'

  // target a date & time
  datePickInput: Date
  selectedIndex: number = null
  selectedTime: string
  setIndex(index) {
    this.selectedIndex = index
    this.selectedTime = document.getElementById(index).innerText
  }
  data = [
    { property: '14h00' },
    { property: '15h00' },
    { property: '16h00' },
    { property: '17h00' },
  ]

  getHours = this.data.map((hours) => hours.property)

  closeModal() {
    this.modalState.emit(false)
  }

  saveDatePicked(event: Event) {
    const data = {
      date: this.datePickInput,
      time: this.selectedTime,
    }
    console.log('data =>', data)
    this.isSubscribed = this.calendarService
      .bookingDateRequest(data.date, data.time)
      .subscribe()

    this.modalState.emit(false)
    alert('Saved Date')
  }

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {}
  ngOnDestroy() {
    this.isSubscribed?.unsubscribe()
  }
}
