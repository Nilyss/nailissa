import { createAction, props } from '@ngrx/store'

// Models
import { User } from '../../models/user'

export const initApp = createAction('Init app')

export const getUserData = createAction(
  '[user] GetUserData',
  props<{ user: Omit<User, 'password'> }>()
)

export const logout = createAction('[User] Logout')
