// actions/auth-action.ts
"use server";

import { signIn } from "next-auth/react"; // Importar la función de inicio de sesión de NextAuth
import { loginSchema, registerSchema } from "@/lib/zod"; // Importar los esquemas de validación de Zod
import { AuthError } from "next-auth"; // Importar errores de autenticación de NextAuth
import { z } from "zod"; // Importar Zod para la validación de datos
import Cookies from "js-cookie"; // Importar js-cookie para manejar cookies

/**
 * Función para registrar un nuevo usuario.
 * @param values - Datos del registro que deben ser validados.
 * @returns - Un objeto que indica el éxito o el error del registro.
 */
export const registerAction = async (
  values: z.infer<typeof registerSchema>
) => {
  try {
    const { success, data } = registerSchema.safeParse(values); // Validar los datos del registro
    if (!success) {
      return {
        error: "Datos de registro inválidos. Por favor, verifica la información proporcionada.", // Retornar error si los datos son inválidos
      };
    }

    // Enviar la solicitud de registro al backend de Django
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        name: data.name,
        is_deaf: data.is_deaf,
        is_mute: data.is_mute,
        security_question_1: data.security_question_1,
        security_answer_1: data.security_answer_1,
        security_question_2: data.security_question_2,
        security_answer_2: data.security_answer_2,
      }),
    });

    // Verificar la respuesta del registro
    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.detail || "Ocurrió un error durante el registro. Inténtalo de nuevo más tarde." };
    }

    // Si el registro es exitoso, intenta iniciar sesión
    const loginResponse = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    // Verificar si el inicio de sesión fue exitoso
    if (loginResponse?.error) {
      return { error: loginResponse.error }; // Manejo de error si el inicio de sesión falla
    }

    return { success: true }; // Retornar éxito si todo va bien
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "Error interno del servidor. Por favor, inténtalo de nuevo más tarde." };
  }
};

/**
 * Función para iniciar sesión de un usuario existente.
 * @param values - Datos de inicio de sesión que deben ser validados.
 * @returns - Un objeto que indica el éxito, el token de acceso o un error.
 */
export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  try {
    // Validar datos usando el esquema de Zod
    const parseResult = loginSchema.safeParse(values);
    if (!parseResult.success) {
      return {
        error: "Datos de inicio de sesión inválidos. Por favor, verifica la información proporcionada.", // Retornar error si los datos son inválidos
      };
    }
    const data = parseResult.data; // Obtener los datos validados

    // Enviar la solicitud de inicio de sesión al backend de Django
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    // Verificar la respuesta del inicio de sesión
    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.detail || "Ocurrió un error durante el inicio de sesión. Inténtalo de nuevo más tarde." };
    }

    // Si el inicio de sesión es exitoso, devolver el token JWT
    const result = await response.json();

    // Almacenar el token en una cookie
    if (result.access) {
      Cookies.set("accessToken", result.access, { expires: 1 }); // Almacenar el token por 1 día
      return { success: true, access: result.access }; // Devolver el token
    } else {
      return { error: "Inicio de sesión exitoso, pero no se proporcionó un token." }; // Manejo de error si no se proporciona el token
    }

  } catch (error) {
    console.error(error); // Log de error para depuración
    return { error: "Error interno del servidor. Por favor, inténtalo de nuevo más tarde." }; // Manejo de error general
  }
};
