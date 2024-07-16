import { login } from '../actions/login'
import { getUserByEmail } from '@/data/user'
import { signIn } from '@/auth'
import {
  ADMIN_LOGIN_REDIRECT,
  STUDENT_LOGIN_REDIRECT,
  TEACHER_LOGIN_REDIRECT,
} from '@/routes'

jest.mock('@/data/user', () => ({
  getUserByEmail: jest.fn(),
}))

jest.mock('@/auth', () => ({
  signIn: jest.fn(),
}))

class MockAuthError extends Error {
  constructor(type: string) {
    super(type)
    this.type = type
  }
  type: string
}

describe('login', () => {
  const validUser = {
    email: 'test@example.com',
    password: 'password123',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should login a user successfully and redirect based on role', async () => {
    const existingUser = {
      email: 'test@example.com',
      role: 'STUDENT',
    }

    ;(getUserByEmail as jest.Mock).mockResolvedValue(existingUser)
    ;(signIn as jest.Mock).mockResolvedValue({})

    const result = await login(validUser)

    expect(result).toBeUndefined()
    expect(getUserByEmail).toHaveBeenCalledWith('test@example.com')
    expect(signIn).toHaveBeenCalledWith('credentials', {
      email: 'test@example.com',
      password: 'password123',
      redirectTo: STUDENT_LOGIN_REDIRECT,
    })
  })

  it('should return error for invalid fields', async () => {
    const invalidUser = {
      email: '',
      password: '',
    }

    const result = await login(invalidUser)

    expect(result).toEqual({ error: 'שדות לא חוקיים!' })
    expect(getUserByEmail).not.toHaveBeenCalled()
    expect(signIn).not.toHaveBeenCalled()
  })

  it('should return error for non-existing user', async () => {
    ;(getUserByEmail as jest.Mock).mockResolvedValue(null)

    const result = await login(validUser)

    expect(result).toEqual({ error: 'שם משתמש/סיסמא לא נכונים' })
    expect(getUserByEmail).toHaveBeenCalledWith('test@example.com')
    expect(signIn).not.toHaveBeenCalled()
  })
})