import { register } from '../actions/register'
import * as bcrypt from 'bcryptjs'
import { getUserByEmail } from '@/data/user'
import { db } from '../lib/db'
import { UserRole } from '@prisma/client'

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
}))

jest.mock('@/data/user', () => ({
  getUserByEmail: jest.fn(),
}))

// Mocking the entire db object with its nested properties
jest.mock('@/lib/db', () => ({
  __esModule: true,
  db: {
    user: {
      create: jest.fn(),
    },
    student: {
      create: jest.fn(),
    },
    teacher: {
      create: jest.fn(),
    },
  },
}))

describe('register', () => {
  const validUser = {
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should register a user successfully', async () => {
    ;(bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword')
    ;(getUserByEmail as jest.Mock).mockResolvedValue(null)
    ;(db.user.create as jest.Mock).mockResolvedValue({
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedpassword',
      role: UserRole.STUDENT,
    })

    const result = await register(validUser, 'STUDENT', 'teacherId')

    expect(result).toEqual({ success: 'המשתמש נוצר בהצלחה!' })
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10)
    expect(getUserByEmail).toHaveBeenCalledWith('test@example.com')
    expect(db.user.create).toHaveBeenCalledWith({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedpassword',
        role: 'STUDENT',
      },
    })
    expect(db.student.create).toHaveBeenCalledWith({
      data: {
        userId: 1,
        teacherId: 'teacherId',
        name: 'Test User',
        image: null,
      },
    })
  })
})