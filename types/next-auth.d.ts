// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    id: string; // Adding custom id property to session
  }

  interface JWT {
    id: string; // Adding custom id property to JWT
  }
}