// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    access: string; // Token de acceso devuelto por Django
  }

  interface JWT {
    accessToken: string; // El token de acceso JWT
  }

  interface Session extends DefaultSession {
    accessToken: string; // El token de acceso en la sesión
  }
}
