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
} from "../../ui/form";
import { Button } from "../../ui/button";
import { AnswerQuestionnaireSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "../../ui/textarea";
import Loading from "../../loading";
import { FormError } from "../../form-error";
import { FormSuccess } from "../../form-success";
import { Questionnaire } from "@prisma/client";
import { useRouter } from "next/navigation";
import { saveAnswerQuestionnaire } from "@/lib/ServerActions/ServerActions";

interface TeacherAnswerProps {
  CurrentQuestionnaire?: QuestionnaireWithDetails | null;
  userName?: string | null;
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

const TeacherAnswer: React.FC<TeacherAnswerProps> = ({
  CurrentQuestionnaire,
  userName,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof AnswerQuestionnaireSchema>>({
    resolver: zodResolver(AnswerQuestionnaireSchema),
    defaultValues: {
      answer: "",
    },
  });

  const onSubmit = (data: z.infer<typeof AnswerQuestionnaireSchema>) => {
    setIsLoading(true);
    if (CurrentQuestionnaire?.id) {
      startTransition(async () => {
        saveAnswerQuestionnaire(data, CurrentQuestionnaire?.id).then(
          (result) => {
            setError(result.error);
            setSuccess(result.success);
            if (result.success) {
              setTimeout(() => {
                router.push("/");
                router.refresh();
              }, 1000);
            }
          }
        );
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div
            className="flex flex-col items-center justify-center border rounded-xl border-lightRed w-full md:w-3/4 mx-auto my-8"
            dir="rtl"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full p-2"
              >
                <div className="flex flex-col space-y-1 mb-8">
                  <div className="text-lg md:text-xl text-darkRed font-medium my-4">
                    {userName}, אנא השב על השאלון{" "}
                  </div>
                  <p className="text-base md:text-lg text-grayish font-medium">
                    נשלח מאת: מנהל האתר.
                  </p>
                  <p className="text-sm md:text-base text-lightRed">
                    כותרת: {CurrentQuestionnaire?.title}
                  </p>
                  <p className="text-sm md:text-base text-lightRed">
                    תוכן: {CurrentQuestionnaire?.content}
                  </p>
                </div>
                <FormField
                  name="answer"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-darkRed font-medium text-lg md:text-xl"></FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="כתוב את תשובתך כאן .."
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
                      className="bg-lightBeige border rounded-md  
                       border-lightRed text-lightRed"
                      type="submit"
                    >
                      שלח
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          </div>
        </>
      )}
    </>
  );
};

export default TeacherAnswer;
