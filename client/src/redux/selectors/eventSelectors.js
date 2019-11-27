import { createSelector } from 'reselect'

export const selectEvent = state => state.event
export const selectEventEvents = createSelector(
  [selectEvent],
  event => event.events
)
