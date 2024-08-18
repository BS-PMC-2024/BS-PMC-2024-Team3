import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface AnswerProps {
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

const AnswerList: React.FC<AnswerProps> = ({ answers }) => {
  return (
    <>
      <h2
        className="text-xl md:text-2xl lg:text-3xl 2xl:text-5xl text-darkRed m-2"
        dir="rtl"
      >
        תשובות המורים:
      </h2>
      <div className="border border-grayish rounded-xl mx-2" dir="rtl">
        {answers.map((answer) => {
          const nameParts = answer.teacher.name?.split(" ");
          const userInitials =
            nameParts && nameParts.length >= 2
              ? nameParts[0][0] + nameParts[1][0]
              : "AA";
          return (
            <div key={answer.id} className="flex p-2">
              <div className="flex items-start">
                {answer.teacher.image ? (
                  <Image
                    src={answer.teacher.image}
                    alt={answer.teacher.name || ""}
                    className="rounded-full"
                    width={50}
                    height={50}
                  />
                ) : (
                  <Avatar className="flex items-start scale-90">
                    <AvatarImage
                      src={answer.teacher.image || ""}
                      alt={userInitials}
                    />
                    <AvatarFallback className="bg-lightRed text-lightBeige">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
              <div className="flex flex-col mr-2 w-full">
                <div className="flex items-center">
                  <h4 className="text-sm font-semibold text-black ml-2">
                    {answer.teacher.name || "Unknown Teacher"}
                  </h4>
                  <div className="text-xs text-grayish">
                    {answer.answeredAt
                      ? new Date(answer.answeredAt).toLocaleString("he-IL")
                      : "Just now"}
                  </div>
                </div>
                <p className="mt-1 text-sm text-lightRed border border-grayish rounded-lg bg-lightBeige p-1 w-full whitespace-pre-wrap">
                  {answer.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AnswerList;
