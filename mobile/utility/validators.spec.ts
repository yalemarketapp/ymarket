import { validateYaleEmail, validatePassword, validateConfirmPassword } from './validators'

describe('validateYaleEmail', () => {
  it('invalid: not an email', () => {
    const email = 'austin.chen'
    expect(validateYaleEmail(email)).toBe('Invalid email format')
  })

  it('invalid: no name', () => {
    const email = '@yale.edu'
    expect(validateYaleEmail(email)).toBe('Invalid email format')
  })

  it('invalid: not a Yale email', () => {
    const email = 'austin.chen@notyale.edu'
    expect(validateYaleEmail(email)).toBe('Must be a Yale email')
  })

  it('valid', () => {
    const email = 'austin.chen@yale.edu'
    expect(validateYaleEmail(email)).toBe('')
  })
})

describe('validatePassword', () => {
  it('invalid: too short', () => {
    const password = 'a'
    expect(validatePassword(password)).toBe('Must be at least 8 characters')
  })

  it('valid', () => {
    const password = 'austinchen'
    expect(validatePassword(password)).toBe('')
  })
})

describe('validateConfirmPassword', () => {
  it('invalid: not equal', () => {
    const password = 'austinchen'
    const confirmPassword = 'austinchen1'
    expect(validateConfirmPassword(confirmPassword, password)).toBe('Passwords must match')
  })

  it('valid', () => {
    const password = 'austinchen'
    const confirmPassword = 'austinchen'
    expect(validateConfirmPassword(confirmPassword, password)).toBe('')
  })
})
