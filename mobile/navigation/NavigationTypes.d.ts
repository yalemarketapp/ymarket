export type LoggedOutStackParamList = {
  Login: { email: string }
  Register: { email: string }
  ResetPassword: { email: string }
}

export type ProfileStackParamList = {
  Profile: undefined
}

export type BaseTabNavigatorParamList = {
  Home: undefined
  ProfileRoot: undefined
}
