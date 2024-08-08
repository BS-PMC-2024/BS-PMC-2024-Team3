"use client";
import { Label } from "@/components/ui/label";
import { saveStudentAnswerFromTask } from "@/lib/ServerActions/ServerActions";
import { Question } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";

interface VocabularyTaskProps {
  question: Question;
  handleFlag: () => void;
  resetCurrentQuestion: () => void;
}
const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const VocabularyTask: React.FC<VocabularyTaskProps> = ({
  question,
  handleFlag,
  resetCurrentQuestion,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [answer, setAnswer] = useState<{
    hasAnswered: boolean;
    isCorrect: boolean;
  }>({ hasAnswered: false, isCorrect: false });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fourAnswersArray, setFourAnswersArray] = useState<string[]>([]);
  useEffect(() => {
    const initialAnswers = shuffleArray([
      question.correctAnswer,
      question.falseAnswer1 ? question.falseAnswer1 : "",
      question.falseAnswer2 ? question.falseAnswer2 : "",
      question.falseAnswer3 ? question.falseAnswer3 : "",
    ]);
    setFourAnswersArray(initialAnswers);
    setAnswer({ hasAnswered: false, isCorrect: false });
    setUserAnswer("");
  }, [question]);

  const handleAnswerSubmit = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const ChosenAnswer = event.target.value;
    setUserAnswer(ChosenAnswer);
    if (question.correctAnswer === ChosenAnswer) {
      setAnswer({ hasAnswered: true, isCorrect: true });
      await saveStudentAnswerFromTask(question.id, ChosenAnswer, true);
    } else {
      setAnswer({ hasAnswered: true, isCorrect: false });
      await saveStudentAnswerFromTask(question.id, ChosenAnswer, false);
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
            <div className="text-xs sm:text-xs md:text-sm text-black">
              <span className="text-darkRed font-semibold">Word: </span>
              {question.text}
            </div>
            {!answer.hasAnswered ? (
              <div className="text-xs sm:text-xs md:text-sm py-2">
                <Label className=" text-darkRed font-medium">
                  Select the right answer:
                </Label>
                <div className="mt-1">
                  <form>
                    {fourAnswersArray.map((answer, key) => (
                      <div className="flex items-center" key={key}>
                        <label className="text-xs sm:text-xs md:text-sm mb-2">
                          <input
                            type="radio"
                            name="answer"
                            value={answer}
                            checked={userAnswer === answer}
                            onChange={handleAnswerSubmit}
                            className="hidden"
                            id={`custom-radio-${key}`}
                          />
                          <span
                            className={`inline-block w-3 h-3 mr-2 rounded-full border border-black ${
                              userAnswer === key.toString()
                                ? "bg-grayish border-black"
                                : "bg-lightBeige"
                            }`}
                            aria-hidden="true"
                          ></span>
                          {answer}
                        </label>
                      </div>
                    ))}
                  </form>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-x-2">
                {answer.isCorrect ? (
                  <>
                    <div
                      className="text-lg sm:text-2xl animate-bounce text-green-400 font-semibold text-center pt-3 pb-2"
                      dir="rtl"
                    >
                      צודק, תשובה נכונה ✓
                    </div>
                    <div
                      className="flex text-xs sm:text-xs md:text-sm text-black py-1 justify-center"
                      dir="rtl"
                    >
                      <span className="text-grayish font-semibold mx-1">
                        תשובה נכונה:{" "}
                      </span>
                      {question.correctAnswer}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col text-sm sm:text-sm md:text-base">
                    <div
                      className="text-lg sm:text-2xl text-darkRed font-semibold text-center pt-2"
                      dir="rtl"
                    >
                      טעות ✘
                    </div>
                    <div
                      className="flex justify-center text-grayish py-1 mx-1"
                      dir="rtl"
                    >
                      התשובה הנכונה היא :{question.correctAnswer}
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

export default VocabularyTask;
