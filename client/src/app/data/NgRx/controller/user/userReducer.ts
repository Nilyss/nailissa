import { Action, createReducer, on } from '@ngrx/store'

// Models
import { User } from '../../models/user'
// Actions
import * as UserActions from './userAction'

export interface UserState {
  isLoggedIn: boolean
  user: Omit<User, 'password'>
}

export const initialState = {
  isLoggedIn: false,
  user: <Omit<User, 'password'>>{
    _id: null,
    email: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
    postalAddress: null,
    bookedDate: null,
  },
}

export const userReducer = createReducer(
  initialState,
  on(UserActions.initApp, (state) => {
    return {
      ...state,
    }
  }),
  on(UserActions.getUserData, (state, props) => {
    return {
      ...state,
      isLoggedIn: props.isLoggedIn,
      user: props.user,
    }
  }),
  on(UserActions.editUserData, (state, props) => {
    return {
      ...state,
      user: props.user,
    }
  }),

  on(UserActions.logout, (state, props) => {
    return {
      ...state,
      isLoggedIn: props.isLoggedIn,
      user: initialState.user,
    }
  })
)
export function UserReducer(state: UserState, action: Action) {
  return userReducer(state, action)
}
