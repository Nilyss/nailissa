import { Injectable } from '@angular/core'
import { User } from './user'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { tap, catchError, Observable, of } from 'rxjs'
import { BookedDate } from './bookedDate'

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // CRUD User operations
  createUserRequest(user: User): Observable<User> {
    return this.http
      .post<User>(
        this.apiBaseUrl + this.userEndpoint + '/signup',
        user,
        this.httpOptions
      )
      .pipe(
        tap((res) => this.log(res)),
        catchError((error) => this.handleError(error, null))
      )
  }

  connectUserRequest(email: string, password: string): Observable<User> {
    return this.http
      .post<User>(
        this.apiBaseUrl + this.userEndpoint + '/login',
        { email, password },
        this.httpOptions
      )
      .pipe(
        tap((res) => this.log(res)),
        catchError((error) => this.handleError(error, null))
      )
  }

  disconnectUserRequest(): Observable<string> {
    return this.http
      .get<string>(
        this.apiBaseUrl + this.userEndpoint + '/logout',
        this.httpOptions
      )
      .pipe(
        tap((res) => this.log(res)),
        catchError((error) => this.handleError(error, null))
      )
  }

  getConnectedUserId(): Observable<string> {
    return this.http
      .get<string>(this.apiBaseUrl + '/jwtid', this.httpOptions)
      .pipe(
        tap((res) => {
          this.log('User ID successfully fetched => ' + res)
        }),
        catchError((error) => this.handleError(error, null))
      )
  }

  getConnectedUserData(userId: string): Observable<User> {
    return this.http
      .get<User>(
        this.apiBaseUrl + this.userEndpoint + `/${userId}`,
        this.httpOptions
      )
      .pipe(
        tap((res) => {
          this.log("User's datas successfully fetched =>" + res)
        }),
        catchError((error) => this.handleError(error, undefined))
      )
  }
  editConnectedUserData(user: User): Observable<User> {
    return this.http
      .put<User>(
        this.apiBaseUrl + this.userEndpoint + `/update` + `/${user._id}`,
        user,
        this.httpOptions
      )
      .pipe(
        tap((res) => {
          this.log(`User's datas get updated` + res)
        }),
        catchError((error) => this.handleError(error, undefined))
      )
  }

  editConnectedUserBookedDate(
    userId: string,
    data: BookedDate
  ): Observable<User> {
    return this.http
      .put<User>(
        this.apiBaseUrl + this.userEndpoint + `/booking` + `/${userId}`,
        data,
        this.httpOptions
      )
      .pipe(
        tap((res) => {
          this.log(`User's booked date get updated` + res)
        }),
        catchError((error) => this.handleError(error, undefined))
      )
  }

  private apiBaseUrl: string = 'http://localhost:8000/api'
  private userEndpoint: string = '/users'

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
