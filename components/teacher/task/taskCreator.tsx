"use client";
import { Question, Student } from "@prisma/client";
import { PaginationPage } from "./PaginationPage";
import { useEffect, useRef, useState } from "react";
import QuestionComponent from "./Question";
import { Button } from "@/components/ui/button";
import HashLoader from "react-spinners/HashLoader";
import { createTaskToStudent } from "@/lib/ServerActions/ServerActions";
import { useRouter } from "next/navigation";
import SendComponent from "./sendComponent";

interface TaskCreatorProps {
  student: Student;
}

interface level {
  name: string;
  label: string;
}
const Levels = [
  { name: "Easy", label: "קל" },
  { name: "Medium", label: "בינוני" },
  { name: "Hard", label: "קשה" },
];
const QuestionType = [
  { name: "grammar", label: "דקדוק" },
  { name: "vocabulary", label: "אוצר מילים" },
  { name: "openQuestions", label: "שאלה פתוחה" },
];

export function TaskCreator({ student }: TaskCreatorProps) {
  const [level, setLevel] = useState<level | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [questionArr, setQuestionArr] = useState<Question[]>([]);
  const [selectedQuestionType, setSelectedQuestionType] = useState<string>("");
  const [date, setDate] = useState("");
  const [messageText, setMessageText] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openSendComponent, setOpenSendComponent] = useState<boolean>(false);
  const router = useRouter();

  const handleLevelChosen = (LevelChosen: level) => {
    setLevel(LevelChosen);
  };
  const handleTypeChosen = (typeChosen: string) => {
    setSelectedQuestionType(typeChosen);
  };

  const SendToDB = async () => {
    setIsLoading(true);
    try {
      if (level) {
        await createTaskToStudent(
          level.name,
          selectedQuestionType,
          questionArr,
          student.id,
          date,
          messageText
        );
        router.push(`/teacher/mystudent?id=${student.id}`);
        router.refresh();
      }
    } catch (error) {
      console.error("לא הצלחנו לשלוח את המשימה לסטודנט");
    } finally {
      setIsLoading(false);
    }
  };

  const SendQuestion = async () => {
    if (questionArr.length == 0) {
      return;
    }
    setOpenSendComponent(true);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center pb-2 space-x-2">
          <p className="text-darkRed text-xxs py-2" dir="rtl">
            יוצר את המשימה לסטודנט - {student.name}
          </p>
          <HashLoader color="#E85A4F" size={25} />
        </div>
      ) : (
        <>
          {!openSendComponent ? (
            <>
              {!level || !selectedQuestionType ? (
                <div className="flex flex-col items-center m-1 sm:m-2 mb-4">
                  <div
                    className="text-center text-base sm:text-xl text-black"
                    dir="rtl"
                  >
                    אנא בחר את הרמה של המשימה
                  </div>
                  <div className="flex flex-wrap" dir="rtl">
                    {Levels.map((levelItem) => (
                      <Button
                        key={levelItem.label}
                        variant="outline"
                        className={`m-2 border-lightRed hover:bg-grayish/50 text-lightRed ${
                          levelItem.label === level?.label
                            ? "bg-grayish/50"
                            : ""
                        }`}
                        onClick={() => handleLevelChosen(levelItem)}
                      >
                        {levelItem.label}
                      </Button>
                    ))}
                  </div>
                  <div
                    className="text-center text-base sm:text-xl text-black"
                    dir="rtl"
                  >
                    אנא בחר את סוג השאלה
                  </div>
                  <div className="flex flex-wrap" dir="rtl">
                    {QuestionType.map((qType) => (
                      <Button
                        key={qType.label}
                        variant="outline"
                        className={`m-2 border-lightRed hover:bg-grayish/50 text-lightRed ${
                          selectedQuestionType === qType.name
                            ? "bg-grayish/50"
                            : ""
                        }`}
                        onClick={() => handleTypeChosen(qType.name)}
                      >
                        {qType.label}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col w-full min-h-full px-2">
                  <div
                    className="text-center text-base sm:text-md md:text-lg text-darkRed py-1"
                    dir="rtl"
                  >
                    כמות שאלות במשימה כרגע - {questionArr.length + 1}
                  </div>
                  <div className="flex justify-between">
                    <div
                      className="text-base sm:text-md md:text-lg text-grayish underline py-1 cursor-pointer hover:scale-105 hover:text-black"
                      dir="rtl"
                      onClick={() => {
                        setLevel(null);
                      }}
                    >
                      רמת שאלות - {level.label}
                    </div>
                    <div
                      className="text-base sm:text-md md:text-lg text-grayish underline py-1"
                      dir="rtl"
                    >
                      שאלה נוכחית כרגע - {currentPage}
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow justify-center items-center mt-2">
                    <QuestionComponent
                      key={currentPage}
                      questionArr={questionArr}
                      setQuestionArr={setQuestionArr}
                      currentPage={currentPage}
                      level={level.name}
                      selectedQuestionType={selectedQuestionType}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>

                  <div className="flex flex-col justify-center items-end mt-auto">
                    <PaginationPage
                      questionAmount={questionArr.length + 1}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      SendQuestion={SendQuestion}
                    />
                  </div>
                </div>
              )}
            </>
          ) : (
            <SendComponent
              date={date}
              setDate={setDate}
              messageText={messageText}
              setMessageText={setMessageText}
              SendToDB={SendToDB}
            />
          )}
        </>
      )}
    </>
  );
}
