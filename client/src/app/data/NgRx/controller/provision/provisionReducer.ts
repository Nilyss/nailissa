import { Action, createReducer, on } from '@ngrx/store'

// Models
import { Provision } from '../../models/provision'
// Actions
import * as ProvisionActions from './provisionAction'

export interface ProvisionState {
  provisions: {
    provision: Provision[]
  }
}

export const initialState = {
  provisions: {
    provision: [],
  },
}

export const provisionReducer = createReducer(
  initialState,
  on(ProvisionActions.initApp, (state) => {
    return {
      ...state,
    }
  }),
  on(ProvisionActions.getProvisionData, (state, props) => {
    return {
      ...state,
      provisions: { provision: props.provisions },
    }
  })
)

export function ProvisionReducer(state: ProvisionState, action: Action) {
  return provisionReducer(state, action)
}
