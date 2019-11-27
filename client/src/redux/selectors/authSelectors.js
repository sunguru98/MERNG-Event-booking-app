import { createSelector } from 'reselect'

export const selectAuth = state => state.auth

export const selectAuthAccessToken = createSelector(
  [selectAuth],
  auth => auth.accessToken
)
export const selectAuthUser = createSelector([selectAuth], auth => auth.user)
