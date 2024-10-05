// app/(protected)/ProtectedComponent.tsx
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react"; // Importar useState
import { useRouter } from "next/router";

const ProtectedComponent = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar el loading

  useEffect(() => {
    // Redirige si no hay sesión
    if (status === "loading") return; // Esperar a que la sesión se cargue

    if (!session) {
      router.push("/login"); // Redirigir a la página de login
    } else {
      setIsLoading(false); // Si hay sesión, ya no está cargando
    }
  }, [session, status, router]);

  if (isLoading) {
    return <div>Cargando...</div>; // Mostrar loading si aún no hay sesión
  }

  return (
    <div>
      <h1>Bienvenido, {session?.user?.name}</h1>
      {/* Agrega más contenido protegido aquí */}
    </div>
  );
};

export default ProtectedComponent;
