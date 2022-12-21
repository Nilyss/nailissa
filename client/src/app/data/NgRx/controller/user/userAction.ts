import { createAction, props } from '@ngrx/store'

// Models
import { User } from '../../models/user'

export const initApp = createAction('Init User')

export const getUserData = createAction(
  '[user] GetUserData',
  props<{ user: Omit<User, 'password'>; isLoggedIn: boolean }>()
)

export const logout = createAction(
  '[User] Logout',
  props<{ response: string; isLoggedIn: boolean }>()
)
