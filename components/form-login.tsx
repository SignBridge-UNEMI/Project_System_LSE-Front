<<<<<<< HEAD
// components/form-login.tsx
"use client";

import { loginSchema } from "@/lib/zod"; // Importar esquema de validación para el inicio de sesión
import { zodResolver } from "@hookform/resolvers/zod"; // Importar el resolutor de Zod
import { useForm } from "react-hook-form"; // Importar hook para manejar formularios
import { z } from "zod"; // Importar Zod para la validación
import { loginAction } from "@/actions/auth-action"; // Importar la acción de inicio de sesión
import { Button } from "@/components/ui/button"; // Importar componente de botón
import {
  Form,
  FormControl,
=======
"use client";

import { z } from "zod";
import { loginSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
>>>>>>> 792c761f0fc856ac30dbf917f8dd48c37553f6e0
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
<<<<<<< HEAD
} from "@/components/ui/form"; // Importar componentes del formulario
import { Input } from "@/components/ui/input"; // Importar componente de entrada
import { useRouter } from "next/navigation"; // Importar hook para navegación
import { useState, useTransition } from "react"; // Importar hooks de estado y transición
import { FaGoogle } from "react-icons/fa6"; // Importar icono de Google
import ButtonSocial from "./button-social"; // Importar botón social para autenticación con Google
import Cookies from "js-cookie"; // Importar js-cookie para manejar cookies

interface FormLoginProps {
  isVerified: boolean; // Propiedad para verificar el correo
  OAuthAccountNotLinked: boolean; // Propiedad para verificar si la cuenta OAuth está vinculada
}

const FormLogin = ({ isVerified, OAuthAccountNotLinked }: FormLoginProps) => {
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const [isPending, startTransition] = useTransition(); // Estado para manejar la transición de carga
  const router = useRouter(); // Hook de Next.js para navegación

  // Configuración del formulario utilizando react-hook-form
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema), // Usar Zod para la validación del formulario
    defaultValues: {
      email: "", // Valor por defecto para el campo de email
      password: "", // Valor por defecto para el campo de contraseña
    },
  });

  /**
   * Función para manejar el envío del formulario.
   * @param values - Datos del formulario que deben ser validados.
   */
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setError(null); // Limpiar errores previos
    startTransition(async () => {
      const response = await loginAction(values); // Llamar a la acción de inicio de sesión

      // Manejar errores en la respuesta
      if (response.error) {
        setError(response.error); // Establecer el mensaje de error
      } else {
        // Almacenar el token en una cookie si existe
        if (response.access) {
          Cookies.set("accessToken", response.access, { expires: 1 }); // Almacenar el token por 1 día
        }
        router.push("/dashboard"); // Redirigir al dashboard si la autenticación es exitosa
      }
    });
=======
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormLogin = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
>>>>>>> 792c761f0fc856ac30dbf917f8dd48c37553f6e0
  }

  return (
    <div className="max-w-52">
<<<<<<< HEAD
      <h1 className="mb-5 text-center text-2xl">Iniciar sesión</h1>

      {/* Mensaje de verificación de correo */}
      {isVerified && (
        <p className="text-center text-green-500 mb-5 text-sm">
          Correo verificado, ahora puedes iniciar sesión
        </p>
      )}

      {/* Mensaje de cuenta OAuth no vinculada */}
      {OAuthAccountNotLinked && (
        <p className="text-center text-red-500 mb-5 text-sm">
          Para confirmar tu identidad, inicia sesión con la misma cuenta que
          usaste originalmente.
        </p>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Campo de email */}
=======
      <h1>Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
>>>>>>> 792c761f0fc856ac30dbf917f8dd48c37553f6e0
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
<<<<<<< HEAD
                  <Input placeholder="email" type="email" {...field} />
                </FormControl>
                <FormMessage /> {/* Mensaje de error para el campo */}
              </FormItem>
            )}
          />

          {/* Campo de contraseña */}
=======
                  <Input placeholder="email" 
                  type="email"
                  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
>>>>>>> 792c761f0fc856ac30dbf917f8dd48c37553f6e0
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
<<<<<<< HEAD
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage /> {/* Mensaje de error para el campo */}
              </FormItem>
            )}
          />

          {/* Mostrar mensaje de error si existe */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Botón de inicio de sesión */}
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <span className="flex items-center">
                <span className="loader mr-2"></span> {/* Spinner de carga */}
                Iniciando...
              </span>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>
        </form>
      </Form>

      {/* Enlace para recuperar contraseña */}
      <div className="mt-3">
        <a
          href="/forgot-password"
          className="text-sm text-blue-500 hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      {/* Botón para iniciar sesión con Google */}
      <div className="mt-5 space-y-4">
        <ButtonSocial provider="google">
          <FaGoogle className="mr-2 h-4 w-4" />
          <span>Iniciar sesión con Google</span>
        </ButtonSocial>
      </div>
=======
                  <Input placeholder="password" 
                  type="password"
                  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
>>>>>>> 792c761f0fc856ac30dbf917f8dd48c37553f6e0
    </div>
  );
};

<<<<<<< HEAD
export default FormLogin; // Exportar el componente
=======
export default FormLogin;
>>>>>>> 792c761f0fc856ac30dbf917f8dd48c37553f6e0
