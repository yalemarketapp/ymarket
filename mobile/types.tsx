import { JwtPayload } from 'jwt-decode'

// Auth
export type AccessToken = string | undefined

export type RefreshTokenType = JwtPayload & {
  token_type: 'refresh'
  user_id: string
}

// Components
export type formInput = {
  value: string
  error: string
}

// Frontend models
export type UserType = UserProfileType

// Backend models
export type UserProfileType = {
  avatar_url: string
  biography: string
  email: string
  first_name: string
  id: string
  last_name: string
}

// Utility
export type marginStyling = {
  margin?: number
  marginHorizontal?: number
  marginVertical?: number
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
}
