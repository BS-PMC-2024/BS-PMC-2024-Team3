"use client";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useTransition } from "react";
import { LoginSchema } from "@/schemas";
import { Form } from "../ui/form";

import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import { useSearchParams } from "next/navigation";
const LoginForm = () => {
  const searchParam = useSearchParams();
  const urlError =
    searchParam.get("error") === "OAuthAccountNotLinked"
      ? "אנא התחבר עם האימייל הזה בדרך אחרת"
      : "";
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
        // setSuccess(data.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="ברוך השב"
      headerTitle="התחברות"
      backButtonLabel="אין לך משתמש עדין?"
      backButtonHref="/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
