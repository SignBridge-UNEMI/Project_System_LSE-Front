import { z } from 'zod';

// Función para refinar las preguntas y respuestas de seguridad
const refineSecurityField = (field: string | undefined, ctx: any, errorMessage: string) => {
   if ((ctx.parent.is_deaf || ctx.parent.is_mute) && !field) {
      return ctx.addIssue({
         code: z.ZodIssueCode.custom,
         message: errorMessage,

      });
   }
};

export const registerSchema = z.object({
   name: z
      .string({ required_error: "El nombre es obligatorio" })
      .min(1, { message: "El nombre es obligatorio" })
      .max(32, { message: "El nombre debe tener menos de 32 caracteres" }),

   email: z
      .string({ required_error: "El correo electrónico es obligatorio" })
      .min(1, { message: "El correo electrónico es obligatorio" })
      .email({ message: "Correo electrónico no válido" }),

   password: z
      .string({ required_error: "La contraseña es obligatoria" })
      .min(6, { message: "La contraseña debe tener más de 6 caracteres" })
      .max(32, { message: "La contraseña debe tener menos de 32 caracteres" }),

   confirmPassword: z.string().min(6, { message: "La contraseña debe tener más de 6 caracteres" }).max(32, {
      message: "La contraseña debe tener menos de 32 caracteres",
   }).superRefine((val: string, ctx) => {
      const { password } = (ctx as any).parent;
      if (val !== password) {
         ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Las contraseñas no coinciden",
         });
      }
   }),

   is_deaf: z.boolean().optional(),
   is_mute: z.boolean().optional(),

   security_question_1: z.string().optional().superRefine((val, ctx) => {
      refineSecurityField(val, ctx, "Por favor, selecciona una pregunta de seguridad");
   }),

   security_answer_1: z.string().optional().superRefine((val, ctx) => {
      refineSecurityField(val, ctx, "Por favor, responde la pregunta de seguridad");
   }),

   security_question_2: z.string().optional().superRefine((val, ctx) => {
      refineSecurityField(val, ctx, "Por favor, selecciona una pregunta de seguridad");
   }),

   security_answer_2: z.string().optional().superRefine((val, ctx) => {
      refineSecurityField(val, ctx, "Por favor, responde la pregunta de seguridad");
   }),
});

export const loginSchema = z.object({
   email: z
      .string({ required_error: "El correo electrónico es obligatorio" })
      .email({ message: "Correo electrónico no válido" }),
   password: z
      .string({ required_error: "La contraseña es obligatoria" })
      .min(6, { message: "La contraseña debe tener más de 6 caracteres" })
      .max(32, { message: "La contraseña debe tener menos de 32 caracteres" }),

   security_answer_1: z.string().optional(),
   security_answer_2: z.string().optional(),
});
