import { type NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");

  if (!token) {
    return new Response("Token not found", { status: 400 });
  }

  // Enviar la solicitud al backend de Django para verificar el token
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/verify-email/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    return new Response(errorData.message || "An error occurred during verification.", {
      status: response.status,
    });
  }

  // Si la verificación es exitosa
  return new Response(JSON.stringify({ message: "Email verified successfully." }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
