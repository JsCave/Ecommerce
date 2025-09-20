import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      token: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    role: string;
    token: string;
  }
}
