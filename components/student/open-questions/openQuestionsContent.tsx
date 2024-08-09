"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { OpenQuestionsRequest } from "@/lib/openai";
import { studentSelfLearningAnswer } from "@/lib/ServerActions/ServerActions";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import Hint from "../Hint";
import { ClockIcon } from "@heroicons/react/24/outline";

export default function OpenQuestionsContent() {
  const [level, setLevel] = useState<string | null>(null);
  const [response, setResponse] = useState({
    paragraph: "",
    question: "",
    answers: ["1", "2", "3", "4"],
    correctAnswer: 1,
  });
  const [userAnswer, setUserAnswer] = useState("");
  const [answer, setAnswer] = useState<{
    hasAnswered: boolean;
    isCorrect: boolean;
  }>({ hasAnswered: false, isCorrect: false });
  const [Error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hintText, setHintText] = useState<string>();
  const [seconds, setSeconds] = useState(0);
  const Levels = [
    { name: "Easy", label: "Easy" },
    { name: "Medium", label: "Medium" },
    { name: "Hard", label: "Hard" },
  ];
  const handleLevelChosen = (LevelChosen: string) => {
    setLevel(LevelChosen);
    handleRequest(LevelChosen);
  };

  const handleRequest = async (LevelChosen: string) => {
    setIsLoading(true);
    try {
      const Result = await OpenQuestionsRequest(LevelChosen);
      setResponse(Result);
    } catch (error) {
      setError("מצטערים, אך אירעה שגיאה בעת יצירת הבקשה.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSubmit = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHintText("");
    const ChosenAnswer = event.target.value;
    setUserAnswer(ChosenAnswer);
    if (
      response.answers[parseInt(ChosenAnswer, 10)] ===
      response.answers[response.correctAnswer - 1]
    ) {
      setAnswer({ hasAnswered: true, isCorrect: true });
      await studentSelfLearningAnswer(
        level,
        "openQuestions",
        "Text: " + response.paragraph + "\n" + "Question: " + response.question,
        response.correctAnswer.toString(),
        true
      );
    } else {
      setAnswer({ hasAnswered: true, isCorrect: false });
      await studentSelfLearningAnswer(
        level,
        "openQuestions",
        "Text: " + response.paragraph + "\n" + "Question: " + response.question,
        response.correctAnswer.toString(),
        false
      );
    }
  };

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (!isLoading && !Error) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(timer);
      setSeconds(0);
    }
    return () => clearInterval(timer);
  }, [isLoading, Error]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleNextQuestion = () => {
    setSeconds(0);
    setIsLoading(true);
    setUserAnswer("");
    setHintText("");
    setAnswer({ hasAnswered: false, isCorrect: false });
    if (level) {
      handleRequest(level);
    }
  };

  return (
    <div className="flex flex-col justify-between p-4 h-full">
      <>
        {!level ? (
          <div className="flex flex-col m-1 sm:m-2 mb-4">
            <div className="text-base sm:text-xl text-black">
              Hello, Choose your level for open questions please.
            </div>
            <div className="flex flex-col sm:flex-row">
              {Levels.map((level) => (
                <Button
                  key={level.label}
                  variant="outline"
                  className="m-2 border-mediumBeige hover:bg-grayish text-mediumBeige"
                  onClick={() => handleLevelChosen(level.label)}
                >
                  {level.label}
                </Button>
              ))}
            </div>
          </div>
        ) : (
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
                {!Error ? (
                  <div className="flex flex-col m-1 sm:m-2 mb-4">
                    {!answer.hasAnswered && (
                      <Label className="flex justify-center items-center space-x-1 text-lg md:text-2xl text-lightRed mb-2">
                        {formatTime(seconds)}
                        <ClockIcon className="h-5 md:h-7 w-5 md:w-7 ml-2" />
                      </Label>
                    )}
                    <div className="text-xs sm:text-xs md:text-sm text-black">
                      <span className="text-darkRed font-semibold">
                        Paragraph:{" "}
                      </span>
                      {response.paragraph}
                    </div>

                    <div className="text-xs sm:text-xs md:text-sm text-black py-1">
                      <span className="text-darkRed font-semibold">
                        Question:{" "}
                      </span>
                      {response.question}
                    </div>
                    {!answer.hasAnswered ? (
                      <div className="text-xs sm:text-xs md:text-sm py-2">
                        <div className="flex justify-between">
                          <div>
                            <Label className=" text-darkRed font-medium">
                              Select the right answer:
                            </Label>
                            {hintText ? (
                              <Label
                                className=" text-darkRed font-medium"
                                dir="rtl"
                              >
                                <br />
                                רמז: {hintText}
                              </Label>
                            ) : null}
                          </div>
                          <Hint
                            setHintText={setHintText}
                            answerForHint={
                              response.answers[response.correctAnswer - 1]
                            }
                            textForHint={
                              "The Text: " +
                              response.paragraph +
                              ".\nThe question is: " +
                              response.question
                            }
                            type="openquestion"
                          />
                        </div>
                        <div className="mt-1">
                          <form>
                            {Object.entries(response.answers).map(
                              ([key, value]) => (
                                <div className="flex items-center" key={key}>
                                  <label className="text-xs sm:text-xs md:text-sm mb-2">
                                    <input
                                      type="radio"
                                      name="answer"
                                      value={key}
                                      checked={userAnswer === key}
                                      onChange={handleAnswerSubmit}
                                      className="hidden"
                                      id={`custom-radio-${key}`}
                                    />
                                    <span
                                      className={`inline-block w-3 h-3 mr-2 rounded-full border border-black ${
                                        userAnswer === key
                                          ? "bg-grayish border-black"
                                          : "bg-lightBeige"
                                      }`}
                                      aria-hidden="true"
                                    ></span>
                                    {value}
                                  </label>
                                </div>
                              )
                            )}
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
                              {Object.entries(response.answers).map(
                                ([key, value], index) => {
                                  if (index === response.correctAnswer - 1) {
                                    return (
                                      <div
                                        className="text-grayish text-center mx-1"
                                        key={key}
                                      >
                                        {value}
                                      </div>
                                    );
                                  }
                                  return null;
                                }
                              )}
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
                              התשובה הנכונה היא :
                              {Object.entries(response.answers).map(
                                ([key, value], index) => {
                                  if (index === response.correctAnswer - 1) {
                                    return (
                                      <div
                                        className="text-grayish text-center mx-1"
                                        key={key}
                                      >
                                        {value}
                                      </div>
                                    );
                                  }
                                  return null;
                                }
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-darkRed text-xxs py-2" dir="rtl">
                    {Error}
                  </p>
                )}
              </>
            )}
          </>
        )}
      </>
      {answer.hasAnswered && (
        <div className="flex justify-center items-center mt-auto">
          <Button
            variant={"outline"}
            className="bg-lightBeige border border-lightRed rounded-full text-lightRed"
            onClick={() => handleNextQuestion()}
          >
            שאלה הבאה
          </Button>
        </div>
      )}
    </div>
  );
}
