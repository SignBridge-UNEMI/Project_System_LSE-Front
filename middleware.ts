import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET; // Secreto para firmar el JWT de NextAuth

// Rutas públicas que no requieren autenticación
const publicRoutes = ["/", "/prices"];

// Rutas de autenticación, accesibles solo cuando no estás autenticado
const authRoutes = ["/login", "/register"];

// Prefijo para rutas de API de autenticación (por ejemplo, registro e inicio de sesión)
const apiAuthPrefix = "/api/auth";

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req; // URL actual
  const token = await getToken({ req, secret }); // Obtener el token de NextAuth (si existe)
  const isLoggedIn = !!token; // Comprobar si el usuario está autenticado

  console.log({ isLoggedIn, path: nextUrl.pathname }); // Registro de depuración

  // 1. Permitir todas las rutas de la API de autenticación (como /api/auth/login o /api/auth/register)
  if (nextUrl.pathname.startsWith(apiAuthPrefix)) {
    return NextResponse.next();
  }

  // 2. Permitir acceso a rutas públicas sin importar el estado de autenticación
  if (publicRoutes.includes(nextUrl.pathname)) {
    return NextResponse.next();
  }

  // 3. Permitir acceso a las rutas de autenticación (login/register) solo si no estás autenticado
  if (!isLoggedIn && authRoutes.includes(nextUrl.pathname)) {
    return NextResponse.next();
  }

  // 4. Si el usuario está autenticado y trata de acceder a una ruta de autenticación (login/register), redirigir a /dashboard
  if (isLoggedIn && authRoutes.includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl)); // Redirigir al dashboard si el usuario está logueado
  }

  // 5. Redirigir a /login si el usuario no está autenticado y trata de acceder a una ruta protegida
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl)); // Redirigir al login si no está logueado
  }

  // 6. Si el usuario está autenticado y la ruta no es de autenticación, permitir el acceso
  return NextResponse.next(); // Continuar con la solicitud si todas las condiciones anteriores no aplican
}

// Configuración del matcher para aplicar el middleware en todas las rutas excepto archivos estáticos (_next, etc.)
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
