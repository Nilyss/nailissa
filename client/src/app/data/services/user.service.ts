import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { tap, catchError, Observable, of } from 'rxjs'

// Models
import { User } from '../NgRx/models/user'
import { BookedDate } from '../NgRx/models/bookedDate'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // ********** CRUD OPERATIONS => USER
  createUserRequest(user: User): Observable<User> {
    return this.http
      .post<User>(
        this.apiBaseUrl + this.userEndpoint + '/signup',
        user,
        this.httpOptions
      )
      .pipe(
        tap((res: User) => this.log(res)),
        catchError((error) => this.handleError(error, null))
      )
  }

  connectUserRequest(
    email: User['email'],
    password: User['password']
  ): Observable<User> {
    return this.http
      .post<User>(
        this.apiBaseUrl + this.userEndpoint + '/login',
        {
          email,
          password,
        },
        this.httpOptions
      )
      .pipe(
        tap((res: User) => this.log(res)),
        catchError((error) => this.handleError(error, null))
      )
  }

  disconnectUserRequest(): Observable<User['_id']> {
    return this.http
      .get<User['_id']>(
        this.apiBaseUrl + this.userEndpoint + '/logout',
        this.httpOptions
      )
      .pipe(
        tap((res: User['_id']) => this.log(res)),
        catchError((error) => this.handleError(error, null))
      )
  }

  getConnectedUserId(): Observable<User['_id']> {
    return this.http
      .get<User['_id']>(this.apiBaseUrl + '/jwtid', this.httpOptions)
      .pipe(
        tap((res: User['_id']) => {
          this.log('User ID successfully fetched => ' + res)
        }),
        catchError((error) => this.handleError(error, null))
      )
  }

  getConnectedUserData(
    userId: User['_id']
  ): Observable<Omit<User, 'password'>> {
    return this.http
      .get<Omit<User, 'password'>>(
        this.apiBaseUrl + this.userEndpoint + `/${userId}`,
        this.httpOptions
      )
      .pipe(
        tap((res: Omit<User, 'password'>) =>
          this.log("User's datas successfully fetched =>" + res)
        ),
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
        tap((res: User) => this.log(`User's datas get updated` + res)),
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
        tap((res: User) => this.log(`User's booked date get updated` + res)),
        catchError((error) => this.handleError(error, undefined))
      )
  }

  getUserBookedData(userId: User['_id']): Observable<BookedDate> {
    return this.http
      .get<BookedDate>(
        this.apiBaseUrl + this.userEndpoint + `/${userId}` + `/booked`,
        this.httpOptions
      )
      .pipe(
        tap((res: BookedDate) =>
          this.log(`Booked provision successfully fetched : ${res}`)
        ),
        catchError((error) => this.handleError(error, undefined))
      )
  }

  // ********** HTTP REQUEST CONFIGURATION **********

  private apiBaseUrl: string = 'http://localhost:8000/api'
  private userEndpoint: string = '/users'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
    withCredentials: true,
  }

  // ********** LOGS AND ERRORS **********
  private log(res: any) {
    console.log(res)
  }
  private handleError(error: Error, errorValue: any) {
    console.error(error)
    return of(errorValue)
  }
  constructor(private http: HttpClient) {}
}
