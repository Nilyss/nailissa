import { createAction, props } from '@ngrx/store'

// Models
import { Provision } from '../../models/provision'

export const initApp = createAction('Init Provision')

export const getProvisionData = createAction(
  '[provision] GetProvisionData',
  props<{ provisions: Provision[] }>()
)
