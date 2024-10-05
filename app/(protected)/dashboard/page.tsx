import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ProtectedComponent from '../ProtectedComponent';
import LogoutButton from "@/components/logout-button";
import Cookies from 'js-cookie'; // Importar js-cookie

const DashboardPage = () => {
    const { data: session, status } = useSession(); // Obtén la sesión aquí
    const router = useRouter();

    // Si la sesión está cargando, puedes mostrar un indicador de carga.
    if (status === "loading") {
        return <div>Loading...</div>;
    }

    // Verifica si hay un token en las cookies
    const token = Cookies.get("token");
    
    // Si no hay sesión ni token, redirige al usuario a la página de inicio de sesión.
    if (!session && !token) {
        router.push("/login");
        return null; // Retorna null para evitar la renderización.
    }

    return (
        <div className="container">
            <ProtectedComponent />
            {/* Mostrar información de la sesión */}
            {session && (
                <div>
                    <h2>Sesión Activa:</h2>
                    <pre>{JSON.stringify(session, null, 2)}</pre>
                </div>
            )}
            <LogoutButton />
        </div>
    );
};

export default DashboardPage;
