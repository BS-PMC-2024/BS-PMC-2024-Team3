"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GrammarRequest } from "@/lib/openai";
import { studentSelfLearningAnswer } from "@/lib/ServerActions/ServerActions";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import Hint from "../Hint";
import { ClockIcon } from "@heroicons/react/24/outline";

export default function GrammarContent() {
  const [level, setLevel] = useState<string | null>(null);
  const [response, setResponse] = useState({
    mistake: "",
    correct: "",
  });
  const [userAnswer, setUserAnswer] = useState("");
  const [answer, setAnswer] = useState<{
    hasAnswered: boolean;
    isCorrect: boolean;
  }>({ hasAnswered: false, isCorrect: false });
  const [Error, setError] = useState<string | null>(null);
  const [hintText, setHintText] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      const Result = await GrammarRequest(LevelChosen);
      setResponse(Result);
    } catch (error) {
      setError("מצטערים, אך אירעה שגיאה בעת יצירת הבקשה.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSubmit = async () => {
    setHintText("");
    setUserAnswer("");
    if (userAnswer.trim().toLowerCase() === response.correct.toLowerCase()) {
      setAnswer({ hasAnswered: true, isCorrect: true });
      await studentSelfLearningAnswer(
        level,
        "grammar",
        response.mistake,
        response.correct,
        true
      );
    } else {
      setAnswer({ hasAnswered: true, isCorrect: false });
      await studentSelfLearningAnswer(
        level,
        "grammar",
        response.mistake,
        response.correct,
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
              Hello, Choose your level for grammar please.
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
                      <Label className="flex justify-center items-center space-x-1 text-lg md:text-2xl text-lightRed">
                        {formatTime(seconds)}
                        <ClockIcon className="h-5 md:h-7 w-5 md:w-7 ml-2" />
                      </Label>
                    )}
                    <div className="flex justify-between mb-1">
                      <div>
                        <div className="text-base sm:text-xl text-black">
                          {response.mistake}
                        </div>
                        {hintText ? (
                          <Label className="text-darkRed font-medium" dir="rtl">
                            <br />
                            {hintText}
                          </Label>
                        ) : null}
                      </div>
                      <Hint
                        setHintText={setHintText}
                        answerForHint={response.correct}
                        textForHint={response.mistake}
                        type="grammar"
                      />
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
                          <div className="flex flex-col">
                            <div
                              className="text-lg sm:text-2xl animate-bounce text-green-400 font-semibold text-center pt-3 pb-2"
                              dir="rtl"
                            >
                              צודק, תשובה נכונה ✓
                            </div>
                            <div
                              className="text-lg sm:text-2xl text-mediumBeige text-center py-1"
                              dir="rtl"
                            >
                              התשובה הנכונה היא :
                            </div>
                            <div className="text-black text-lg sm:text-2xl text-center">
                              {response.correct}
                            </div>
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
                              {response.correct}
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
