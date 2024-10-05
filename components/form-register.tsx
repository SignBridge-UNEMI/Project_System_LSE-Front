"use client";

import { registerSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { registerAction } from "@/actions/auth-action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const FormRegister = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [isDeaf, setIsDeaf] = useState(false);
  const [isMute, setIsMute] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      security_question_1: "",
      security_answer_1: "",
      security_question_2: "",
      security_answer_2: "",
      is_deaf: false,
      is_mute: false,
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setError(null); // Limpia cualquier error anterior
    startTransition(async () => {
      const response = await registerAction(values);
      if (response.error) {
        setError(response.error); // Establece el error si ocurre
      } else {
        router.push("/dashboard"); // Redirige al dashboard si el registro es exitoso
      }
    });
  }

  return (
    <div className="max-w-52">
      <h1>Register</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="is_deaf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Are you deaf?</FormLabel>
                <FormControl>
                  <Input
                    type="checkbox"
                    checked={isDeaf}
                    onChange={(e) => {
                      setIsDeaf(e.target.checked);
                      field.onChange(e.target.checked); // Actualiza el campo en el formulario
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_mute"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Are you mute?</FormLabel>
                <FormControl>
                  <Input
                    type="checkbox"
                    checked={isMute}
                    onChange={(e) => {
                      setIsMute(e.target.checked);
                      field.onChange(e.target.checked); // Actualiza el campo en el formulario
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="security_question_1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Security Question 1</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Security Question 1"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="security_answer_1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Security Answer 1</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Security Answer 1"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="security_question_2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Security Question 2</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Security Question 2"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="security_answer_2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Security Answer 2</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Security Answer 2"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <FormMessage>{error}</FormMessage>} {/* Muestra error si existe */}
          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormRegister;
