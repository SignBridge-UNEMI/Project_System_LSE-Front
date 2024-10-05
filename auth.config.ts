import { loginSchema } from "@/lib/zod";
import { nanoid } from "nanoid";
import type { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Google,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Validar credenciales
        const { data, success, error } = loginSchema.safeParse(credentials);

        if (!success) {
          throw new Error(error.errors.map((e) => e.message).join(", "));
        }

        // Hacer una solicitud a tu backend Django para verificar el usuario
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        });

        // Si la respuesta no es correcta, lanza un error
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.detail || "Error al iniciar sesión");
        }

        // Obtener la información del usuario desde la respuesta
        const user = await res.json();

        // Verificar la validación del correo electrónico
        if (!user.emailVerified) {
          // Si el usuario no ha verificado su correo, envía el token de verificación
          const token = nanoid();
          await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/verification/send/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: user.email,
              token,
            }),
          });

          throw new Error("Por favor, revisa tu correo electrónico para la verificación");
        }

        // Asegúrate de incluir las propiedades necesarias para NextAuth
        const nextAuthUser: User = {
          id: user.id, // Asegúrate de que esto se corresponda con lo que espera tu backend
          email: user.email,
          name: user.name,
          role: user.role, // Asegúrate de que el campo 'role' exista en la base de datos
          access: user.access || null, // Asegúrate de que el campo 'access' esté presente
        };

        return nextAuthUser; // Retorna el usuario con las propiedades necesarias
      },
    }),
  ],
} satisfies NextAuthConfig;
