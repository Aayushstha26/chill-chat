import prisma from "@/lib/prisma"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcryptjs"
import { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required")
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user) {
          throw new Error("No account found with this email")
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isPasswordCorrect) {
          throw new Error("Incorrect password")
        }

        // strip password before returning
        const { password: _, ...safeUser } = user
        return safeUser
      },
    }),

    GoogleProvider({
        id: "google",
        name: "Google",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      // credentials users are already validated in authorize, skip
      if (account?.provider === "credentials") return true

      // Google sign in — find or create user in DB
      if (account?.provider === "google") {
        try {
          let dbUser = await prisma.user.findUnique({
            where: { email: user.email! },
          })

          if (!dbUser) {
            dbUser = await prisma.user.create({
              data: {
                email: user.email!,
                fullName: profile?.name ?? user.name ?? "",
                phone: "",
                password: "", // empty for OAuth users
              },
            })
          }

          // attach DB fields to user object so jwt callback can use them
          user.id = dbUser.id.toString()
          user.fullName = dbUser.fullName
          user.phone = dbUser.phone
          user.createdAt = dbUser.createdAt
          user.updatedAt = dbUser.updatedAt

          return true
        } catch (error) {
          console.error("Google signIn error:", error)
          return false
        }
      }

      return false
    },

    async jwt({ token, user }) {
      // runs once on login — user is only available then
      if (user) {
        token.id = user.id
        token.fullName = user.fullName
        token.phone = user.phone
        token.createdAt = user.createdAt
        token.updatedAt = user.updatedAt
      }
      return token
    },

    async session({ session, token }) {
      session.user.id = token.id
      session.user.fullName = token.fullName
      session.user.phone = token.phone
      session.user.createdAt = token.createdAt
      session.user.updatedAt = token.updatedAt
      return session
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
}