// mocks/next-auth.ts
export class AuthError extends Error {
    constructor(type: string) {
      super(type)
      this.type = type
    }
    type: string
  }
  
  export const signIn = jest.fn()
  export const signOut = jest.fn()