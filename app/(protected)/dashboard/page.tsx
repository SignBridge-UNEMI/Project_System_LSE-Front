// app/(protected)/dashboard/page.tsx

'use client'; // Indica que este es un Client Component

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ProtectedComponent from '../ProtectedComponent';
import LogoutButton from "@/components/logout-button";
import Cookies from 'js-cookie';

const DashboardPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    const token = Cookies.get("token");
    
    if (!session && !token) {
        router.push("/login");
        return null; 
    }

    return (
        <div className="container">
            <ProtectedComponent />
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