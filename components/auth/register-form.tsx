"use client";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { RegisterSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { RadioGroup } from "../ui/radio-group";
import { getAllTeachersNameAndID } from "@/lib/ServerActions/ServerActions";
import { Teacher } from "@prisma/client";
import HashLoader from "react-spinners/HashLoader";
import { register } from "@/actions/register";
import { ComboboxDemo } from "./register-combobox";
import { useRouter } from "next/navigation";
import { LOGIN_REDIRECT } from "@/routes";
import { Label } from "../ui/label";

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [errorTeacher, setErrorTeacher] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [teachers, setTeachers] = useState<Teacher[] | undefined>([]);
  const [teacherSelected, setTeacherSelected] = useState<string | null>(null);
  const [roleSelected, setRoleSelected] = useState<string>("TEACHER");
  const router = useRouter();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  useEffect(() => {
    if (roleSelected === "STUDENT") {
      setIsLoading(true);
      getAllTeachersNameAndID()
        .then((teachersData) => {
          setTeachers(teachersData);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      setTeachers([]);
    }
  }, [roleSelected]);

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    if (roleSelected === "STUDENT") {
      if (!teacherSelected) {
        setErrorTeacher(true);
        return;
      }
    }
    startTransition(() => {
      register(values, roleSelected, teacherSelected).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        if (data.success) {
          setTimeout(() => {
            router.push(LOGIN_REDIRECT);
          }, 1000);
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="צור משתמש"
      headerTitle="הרשמה"
      backButtonLabel="יש לך כבר משתמש?"
      backButtonHref="/login"
      // showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4" dir="rtl">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>אימייל</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="email@example.com"
                      type="email"
                    />
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
                  <FormLabel>סיסמא</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>שם מלא</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="שם פרטי ושם משפחה"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>תפקיד</FormLabel>
                  <FormControl>
                    <RadioGroup {...field} dir="rtl">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="TEACHER"
                          value="TEACHER"
                          onChange={() => setRoleSelected("TEACHER")}
                          checked={roleSelected === "TEACHER"}
                        />
                        <Label htmlFor="TEACHER" className="mx-1">
                          מורה
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {roleSelected === "STUDENT" && (
              <>
                {isLoading && !teachers ? (
                  <div className="flex flex-col items-center justify-center pb-2 space-x-2">
                    <p className="text-darkRed text-xxs py-2" dir="rtl">
                      טוען ..
                    </p>
                    <HashLoader color="#E85A4F" size={25} />
                  </div>
                ) : (
                  <div>
                    {teachers ? (
                      <ComboboxDemo
                        teachers={teachers}
                        teacherSelected={teacherSelected}
                        setTeacherSelected={setTeacherSelected}
                        setErrorTeacher={setErrorTeacher}
                      />
                    ) : null}
                    {errorTeacher ? (
                      <p className="text-[0.8rem] font-medium text-destructive">
                        אנא בחר מורה
                      </p>
                    ) : null}
                  </div>
                )}
              </>
            )}
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            צור משתמש
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
