"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
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
import { QuestionnaireSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import Loading from "../loading";
import {
  DeleteQuestionnaire,
  saveQuestionnaire,
} from "@/lib/ServerActions/ServerActions";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Questionnaire } from "@prisma/client";
import { useRouter } from "next/navigation";
import AnswerList from "./answersList";

interface QuestionnaireProps {
  CurrentQuestionnaire?: QuestionnaireWithDetails | null;
}

interface QuestionnaireWithDetails extends Questionnaire {
  answers: {
    id: string;
    teacherId: string;
    answer: string | null;
    answeredAt: Date | null;
    teacher: {
      id: string;
      name: string | null;
      image: string | null;
      userId: string;
    };
  }[];
}

const QuestionnaireForm: React.FC<QuestionnaireProps> = ({
  CurrentQuestionnaire,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof QuestionnaireSchema>>({
    resolver: zodResolver(QuestionnaireSchema),
    defaultValues: {
      title: CurrentQuestionnaire?.title || "",
      content: CurrentQuestionnaire?.content || "",
    },
  });

  const onSubmit = (data: z.infer<typeof QuestionnaireSchema>) => {
    setIsLoading(true);
    startTransition(async () => {
      saveQuestionnaire(data).then((result) => {
        setError(result.error);
        setSuccess(result.success);
        if (result.success) {
          setTimeout(() => {
            router.push("/");
            router.refresh();
          }, 1000);
        }
      });
    });
    setIsLoading(false);
  };

  const handleDeleteQuestion = async () => {
    setIsLoading(true);
    await DeleteQuestionnaire();
    setTimeout(() => {
      form.reset({
        title: "",
        content: "",
      });
      router.refresh();
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div
            className="flex flex-col items-center justify-center border rounded-xl border-lightRed mx-2 my-8"
            dir="rtl"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full p-2 m-2"
              >
                <FormField
                  name="title"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-darkRed font-medium text-base md:text-lg">
                        {CurrentQuestionnaire ? "כותרת נוכחית:" : "כותרת:"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="הכנס כותרת .."
                          {...field}
                          className="border-grayish"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="content"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-darkRed font-medium text-lg md:text-xl">
                        {CurrentQuestionnaire ? "תוכן נוכחי:" : "תוכן:"}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="כתוב את התוכן כאן .."
                          {...field}
                          className="border-grayish"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="my-2 text-center">
                  <FormError message={error} />
                  <FormSuccess message={success} />
                </div>
                {success ? null : (
                  <div className="flex flex-row justify-center items-center my-2 gap-2">
                    <Button
                      variant={"outline"}
                      className={`bg-lightBeige border rounded-md  
                        ${
                          !CurrentQuestionnaire
                            ? "border-lightRed text-lightRed"
                            : "border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                        }`}
                      type="submit"
                    >
                      {CurrentQuestionnaire ? "ערוך" : "שלח"}
                    </Button>
                    {CurrentQuestionnaire && (
                      <Button
                        variant={"destructive"}
                        className=" rounded-md hover:bg-red-600"
                        dir="rtl"
                        onClick={() => handleDeleteQuestion()}
                      >
                        מחיקת שאלון ✘
                      </Button>
                    )}
                  </div>
                )}
              </form>
            </Form>
          </div>
          {CurrentQuestionnaire?.answers && (
            <AnswerList answers={CurrentQuestionnaire?.answers} />
          )}
        </>
      )}
    </>
  );
};

export default QuestionnaireForm;
