import { Injectable } from '@angular/core'
import { Observable, tap } from 'rxjs'
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router'

// NgRx
import { Store } from '@ngrx/store'
import { UserState } from '../../data/NgRx/controller/user/userReducer'

@Injectable({
  providedIn: 'root',
})
export class HomeGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store
      .select((state: { user: UserState }) => state.user.isHomePageVisited)
      .pipe(
        tap((visited: boolean) => {
          if (visited) return true
          else {
            this.router.navigate(['/'])
            return false
          }
        })
      )
  }
  constructor(
    private router: Router,
    private store: Store<{ user: UserState }>
  ) {}
}
