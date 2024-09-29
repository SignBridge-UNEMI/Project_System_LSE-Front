'use client';

import { useEffect, useState } from 'react';

interface ApiResponse {
  message: string;
}

export default function Home() {
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/core/api/prueba2/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud a la API');
        }
        return response.json() as Promise<ApiResponse>;
      })
      .then(data => {
        setMessage(data.message);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Error al comunicarse con el servidor');
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Probando la conexión con el backend en /home</h1>
      {isLoading && <p>Cargando...</p>}
      {!isLoading && error && <p style={{ color: 'red' }}>{error}</p>}
      {!isLoading && message && <p style={{ color: 'yellow' }}>{message}</p>}
    </div>
  );
}
