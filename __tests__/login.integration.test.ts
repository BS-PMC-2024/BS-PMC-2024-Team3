// __tests__/login.integration.test.ts
import request from 'supertest';
import { createServer } from 'http';
import { login } from '../actions/login';
import { getUserByEmail } from '@/data/user';
import { signIn } from '@/auth';
import {
  ADMIN_LOGIN_REDIRECT,
  STUDENT_LOGIN_REDIRECT,
  TEACHER_LOGIN_REDIRECT,
} from '@/routes';

jest.mock('@/data/user', () => ({
  getUserByEmail: jest.fn(),
}));

jest.mock('@/auth', () => ({
  signIn: jest.fn(),
}));

class MockAuthError extends Error {
  constructor(type: string) {
    super(type);
    this.type = type;
  }
  type: string;
}

// Create a mock server
const server = createServer((req, res) => {
  if (req.url === '/api/login' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      const { email, password } = JSON.parse(body);
      try {
        const result = await login({ email, password });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(result ? JSON.stringify(result) : '');
      } catch (error) {
        const err = error as Error;
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Login Integration Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should login a user successfully and redirect based on role', async () => {
    const validUser = {
      email: 'test@example.com',
      password: 'password123',
    };
    const existingUser = {
      email: 'test@example.com',
      role: 'STUDENT',
    };

    (getUserByEmail as jest.Mock).mockResolvedValue(existingUser);
    (signIn as jest.Mock).mockResolvedValue({});

    const response = await request(server)
      .post('/api/login')
      .send(validUser);

    expect(response.status).toBe(200);
    expect(response.text).toBe(''); // Check for empty string
    expect(getUserByEmail).toHaveBeenCalledWith('test@example.com');
    expect(signIn).toHaveBeenCalledWith('credentials', {
      email: 'test@example.com',
      password: 'password123',
      redirectTo: STUDENT_LOGIN_REDIRECT,
    });
  });

  it('should return error for invalid fields', async () => {
    const invalidUser = {
      email: '',
      password: '',
    };

    const response = await request(server)
      .post('/api/login')
      .send(invalidUser);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ error: 'שדות לא חוקיים!' });
    expect(getUserByEmail).not.toHaveBeenCalled();
    expect(signIn).not.toHaveBeenCalled();
  });

  it('should return error for non-existing user', async () => {
    const validUser = {
      email: 'test@example.com',
      password: 'password123',
    };

    (getUserByEmail as jest.Mock).mockResolvedValue(null);

    const response = await request(server)
      .post('/api/login')
      .send(validUser);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ error: 'שם משתמש/סיסמא לא נכונים' });
    expect(getUserByEmail).toHaveBeenCalledWith('test@example.com');
    expect(signIn).not.toHaveBeenCalled();
  });
});