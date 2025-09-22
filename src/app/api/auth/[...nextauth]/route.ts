// src/app/api/auth/[...nextauth]/route.ts
import { apiServices } from "@/services/api";
import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// ===== Type augmentation =====
declare module "next-auth" {
  interface Session {
    token: string;
    user: {
      role: string;
    } & DefaultSession["user"];
  }
  interface User {
    token: string;
    role: string;
  }
  interface JWT {
    token: string;
    role: string;
  }
}

// ===== Auth options =====
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your email" },
        password: { label: "Password", type: "password", placeholder: "******" },
      },
      async authorize(credentials) {
        const response = await apiServices.logIn(
          credentials?.email ?? "",
          credentials?.password ?? ""
        );

        if (response.message === "success") {
          return {
            id: response.user.email,
            name: response.user.name,
            email: response.user.email,
            role: response.user.role,
            token: response.token,
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role as string;
      session.token = token.token as string;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.token = user.token;
        token.role = user.role;
      }
      return token;
    },
  },
};

// ===== NextAuth handler =====
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
