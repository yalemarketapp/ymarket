import validator from 'validator'

export const validateYaleEmail = (email: string) => {
  if (!validator.isEmail(email)) {
    return 'Invalid email format'
  } else if (!email.endsWith('@yale.edu')) {
    return 'Must be a Yale email'
  }

  return ''
}

export const validatePassword = (value: string) => {
  if (value.length < 8) return 'Must be at least 8 characters'

  return ''
}

export const validateConfirmPassword = (value: string, password: string) => {
  if (value !== password) return 'Passwords must match'

  return ''
}
