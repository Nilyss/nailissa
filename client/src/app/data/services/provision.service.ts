import { Injectable } from '@angular/core'
import { Provision } from '../NgRx/models/provision'
import { catchError, Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class ProvisionService {
  getAllProvision(): Observable<Provision[]> {
    return this.http
      .get<Provision[]>(
        this.apiBaseUrl + this.provisionEndpoint,
        this.httpOptions
      )
      .pipe(catchError((error) => this.handleError(error, null)))
  }

  private apiBaseUrl: string = 'http://localhost:8000/api'
  private provisionEndpoint: string = '/provisions'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
  }

  // Errors
  private handleError(error: Error, errorValue: any) {
    console.error(error)
    return of(errorValue)
  }

  constructor(private http: HttpClient) {}
}
