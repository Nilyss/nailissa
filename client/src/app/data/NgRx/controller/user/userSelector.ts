import { createSelector } from '@ngrx/store'
import { UserState } from './userReducer'

export interface AppState {
  user: UserState
}
export const selectUser = (state: AppState) => state.user

export const isLoggedIn = createSelector(
  selectUser,
  (state: UserState) => state.isHomePageVisited
)

export const selectUserData = createSelector(
  selectUser,
  (state: UserState) => state.user
)

export const selectUserBookedDate = createSelector(
  selectUser,
  (state: UserState) => state.user.bookedDate
)
