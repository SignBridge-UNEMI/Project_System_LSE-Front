import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import authOptions from "@/auth"; // Asegúrate de que esta ruta sea correcta

export const GET = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, authOptions);
};

export const POST = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, authOptions);
};
