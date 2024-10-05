// Asegúrate de que getSession es una función en "@/auth"
import LogoutButton from "@/components/logout-button";
import { getSession } from "next-auth/react"; 

/**
 * Componente AdminPage que verifica la sesión y el rol del usuario.
 * 
 * Este componente obtiene la sesión actual de forma asíncrona y verifica si el usuario tiene un rol de administrador.
 * Si el usuario no es administrador, muestra un mensaje indicando que el usuario no es administrador.
 * Si el usuario es administrador, muestra la información de la sesión y un botón de cierre de sesión.
 * 
 * @returns {JSX.Element} El JSX para renderizar la página de administrador o un mensaje indicando que el usuario no es administrador.
 */

const AdminPage = async () => {
  const session = await getSession();

  console.log(session);

  if (session?.user?.role !== "admin") {
    return <div>You are not admin</div>;
  }

  return (
    <div className="container">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <LogoutButton />
    </div>
  );
};

export default AdminPage;