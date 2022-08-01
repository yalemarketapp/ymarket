import validator from 'validator'

export const validateYaleEmail = (email: string) => {
  if (!validator.isEmail(email)) {
    return 'Invalid email format'
  } else if (!email.endsWith('@yale.edu')) {
    return 'Must be a Yale email'
  }

  return ''
}
