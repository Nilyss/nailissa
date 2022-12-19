import { Action, createReducer, on } from '@ngrx/store'

// Models
import { User } from '../../models/user'
// Actions
import * as UserActions from './userAction'

export interface UserState {
  user: Omit<User, 'password'>
}

export const initialState = {
  user: <Omit<User, 'password'>>{
    _id: null,
    email: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
    postalAddress: null,
  },
}

export const userReducer = createReducer(
  initialState,
  on(UserActions.initApp, (state) => {
    return {
      ...state,
      user: state.user,
    }
  }),
  on(UserActions.getUserData, (state, props) => {
    return {
      ...state,
      user: props.user,
    }
  })
)
export function UserReducer(state: UserState, action: Action) {
  return userReducer(state, action)
}
