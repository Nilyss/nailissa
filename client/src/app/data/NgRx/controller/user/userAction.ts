import { createAction, props } from '@ngrx/store'

// Models
import { User } from '../../models/user'

export const initApp = createAction('Init User')

export const getUserData = createAction(
  '[user] Get user data',
  props<{
    user: Omit<User, 'password'>
    isHomePageVisited: boolean
  }>()
)

export const editUserData = createAction(
  '[user] Edit user Data',
  props<{ user: Omit<User, 'password'> }>()
)

export const logout = createAction(
  '[User] Logout',
  props<{ response: string; isHomePageVisited: boolean }>()
)
