import { createSelector } from '@ngrx/store'
import { ProvisionState } from './provisionReducer'

export interface AppState {
  provisions: ProvisionState
}

export const selectProvision = (state: AppState) => state.provisions

export const selectProvisionData = createSelector(
  selectProvision,
  (state: ProvisionState) => state.provisions
)
