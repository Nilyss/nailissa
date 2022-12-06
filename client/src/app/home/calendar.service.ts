import { Injectable } from '@angular/core'
import { Observable, of, tap, catchError } from 'rxjs'
import { Calendar } from './calendar'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  bookingDate: Calendar['bookedDate']

  // CRUD Calendar operations
  bookingDateRequest(date: Date, time: string): Observable<Calendar> {
    this.bookingDate = { date, time }
    return this.http
      .post<Calendar>(
        this.apiBaseUrl + this.calendarEndpoint + '/booking',
        this.bookingDate,
        this.httpOptions
      )
      .pipe(
        tap((res) => this.log(res)),
        catchError((error) => this.handleError(error, null))
      )
  }

  private apiBaseUrl: string = 'http://localhost:8000/api'
  private calendarEndpoint: string = '/calendar'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
  }

  // logs & errors
  private log(res: any) {
    console.log(res)
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error)
    return of(errorValue)
  }

  constructor(private http: HttpClient) {}
}
