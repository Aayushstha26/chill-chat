// next-auth.d.ts
import type { DefaultSession, DefaultUser } from "next-auth"
import type { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      fullName: string
      email: string
      phone: string
      createdAt: Date
      updatedAt: Date
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    id: string
    fullName: string
    email: string
    phone: string
    createdAt: Date
    updatedAt: Date
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string
    fullName: string
    phone: string
    createdAt: Date
    updatedAt: Date
  }
}