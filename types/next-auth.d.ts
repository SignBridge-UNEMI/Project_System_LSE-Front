// types/next-auth.d.ts
import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
      token?: string; // Agrega la propiedad token aquí
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
    token?: string; // Agrega la propiedad token aquí si es necesario
  }

  // Extiende el tipo SignInResponse
  interface SignInResponse {
    user?: {
      role?: string;
      token?: string; // Agrega la propiedad token aquí
    };
    error?: string; // Esto se puede incluir si esperas un mensaje de error
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    token?: string; // Agrega la propiedad token aquí
  }
}
