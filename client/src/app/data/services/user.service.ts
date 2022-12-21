import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, Observable, of } from 'rxjs'

// Models
import { User } from '../NgRx/models/user'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // ********** CRUD OPERATIONS => USER
  createUserRequest(
    user: Omit<User, 'bookedDate'>
  ): Observable<Omit<User, 'bookedDate'>> {
    return this.http
      .post<Omit<User, 'bookedDate'>>(
        this.apiBaseUrl + this.userEndpoint + '/signup',
        user,
        this.httpOptions
      )
      .pipe(catchError((error) => this.handleError(error, null)))
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
      .pipe(catchError((error) => this.handleError(error, null)))
  }

  disconnectUserRequest(): Observable<User['_id']> {
    return this.http
      .get<User['_id']>(
        this.apiBaseUrl + this.userEndpoint + '/logout',
        this.httpOptions
      )
      .pipe(catchError((error) => this.handleError(error, null)))
  }

  getConnectedUserId(): Observable<User['_id']> {
    return this.http
      .get<User['_id']>(this.apiBaseUrl + '/jwtid', this.httpOptions)
      .pipe(catchError((error) => this.handleError(error, null)))
  }

  getConnectedUserData(
    userId: User['_id']
  ): Observable<Omit<User, 'password'>> {
    return this.http
      .get<Omit<User, 'password'>>(
        this.apiBaseUrl + this.userEndpoint + `/${userId}`,
        this.httpOptions
      )
      .pipe(catchError((error) => this.handleError(error, undefined)))
  }

  editConnectedUserData(user: Omit<User, 'password'>): Observable<User> {
    return this.http
      .put<User>(
        this.apiBaseUrl + this.userEndpoint + `/update` + `/${user._id}`,
        user,
        this.httpOptions
      )
      .pipe(catchError((error) => this.handleError(error, undefined)))
  }

  editConnectedUserBookedDate(
    userId: string,
    data: User['bookedDate']
  ): Observable<User> {
    return this.http
      .put<User>(
        this.apiBaseUrl + this.userEndpoint + `/booking` + `/${userId}`,
        data,
        this.httpOptions
      )
      .pipe(catchError((error) => this.handleError(error, undefined)))
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

  // ********** ERRORS **********
  private handleError(error: Error, errorValue: any) {
    console.error(error)
    return of(errorValue)
  }
  constructor(private http: HttpClient) {}
}
