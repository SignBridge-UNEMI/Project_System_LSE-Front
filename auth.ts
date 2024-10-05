import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const user = await res.json();
        if (res.ok && user) {
          return user; // Asegúrate de que el objeto 'user' tenga las propiedades necesarias
        } else {
          return null; // Esto rechazará el intento de inicio de sesión
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
};

// Exporta el manejador de autenticación
export default NextAuth(authOptions);
