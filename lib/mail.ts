import { Resend } from "resend";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export const sendEmailVerification = async (email: string, token: string) => {
  try {
    await resend.emails.send({
      from: "NextAuth js <onboarding@resend.dev>",
      to: email,
      subject: "Verifica tu correo electrónico",
      html: `
      <p>Haz clic en el enlace de abajo para verificar tu correo electrónico</p>
      <a href="${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}">Verificar correo electrónico</a>
      `,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
    };
  }
};