"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveStudentAnswerFromTask } from "@/lib/ServerActions/ServerActions";
import { Question } from "@prisma/client";
import { useState } from "react";
import HashLoader from "react-spinners/HashLoader";

interface GrammarTaskProps {
  question: Question;
  handleFlag: () => void;
  resetCurrentQuestion: () => void;
}

const GrammarTask: React.FC<GrammarTaskProps> = ({
  question,
  handleFlag,
  resetCurrentQuestion,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [answer, setAnswer] = useState<{
    hasAnswered: boolean;
    isCorrect: boolean;
  }>({ hasAnswered: false, isCorrect: false });

  const handleAnswerSubmit = async () => {
    // setUserAnswer("");
    if (
      userAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase()
    ) {
      setAnswer({ hasAnswered: true, isCorrect: true });
      await saveStudentAnswerFromTask(question.id, userAnswer, true);
    } else {
      setAnswer({ hasAnswered: true, isCorrect: false });
      await saveStudentAnswerFromTask(question.id, userAnswer, false);
    }
    resetCurrentQuestion();
    handleFlag();
  };

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center pb-2 space-x-2">
          <p className="text-darkRed text-xxs py-2" dir="rtl">
            טוען ..
          </p>
          <HashLoader color="#E85A4F" size={25} />
        </div>
      ) : (
        <>
          <div className="flex flex-col m-1 sm:m-2 mb-4">
            <div className="text-base sm:text-xl text-black">
              {question.text}
            </div>
            {!answer.hasAnswered ? (
              <div className="flex flex-col xs:flex-row xs:space-y-0 xs:space-x-2 space-y-2 py-1">
                <Input
                  type="text"
                  className="p-1 sm:-2 border-mediumBeige text-darkRed"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                />
                <Button
                  variant="outline"
                  className="border-mediumBeige bg-transparent hover:bg-grayish"
                  onClick={handleAnswerSubmit}
                >
                  בדיקת התשובה
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-x-2">
                <Input
                  type="text"
                  className="p-1 sm:-2 border-mediumBeige text-darkRed"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                />
                {answer.isCorrect ? (
                  <div
                    className="text-lg sm:text-2xl text-green-400 font-semibold text-center py-2"
                    dir="rtl"
                  >
                    צודק, תשובה נכונה ✓
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <div
                      className="text-lg sm:text-2xl text-darkRed font-semibold text-center pt-2"
                      dir="rtl"
                    >
                      טעות ✘
                    </div>
                    <div
                      className="text-lg sm:text-2xl text-mediumBeige text-center py-1"
                      dir="rtl"
                    >
                      התשובה הנכונה היא :
                    </div>
                    <div className="text-black text-lg sm:text-2xl text-center">
                      {question.correctAnswer}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default GrammarTask;
