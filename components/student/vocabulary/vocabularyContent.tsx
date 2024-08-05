"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { OpenQuestionsRequest, vocabularyRequest } from "@/lib/openai";
import { studentSelfLearningAnswer } from "@/lib/ServerActions/ServerActions";
import {
  easyAnswersVocabulary,
  hardAnswersVocabulary,
  mediumAnswersVocabulary,
} from "@/lib/vocabulary-random";
import { useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import Hint from "../Hint";

interface VocabularyData {
  words: string[];
  answers: string[];
}

export default function VocabularyContent() {
  const [level, setLevel] = useState<string | null>(null);
  const [fourAnswersArray, setFourAnswersArray] = useState<string[][]>([]);
  const [response, setResponse] = useState({
    words: [],
    answers: [],
  });
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [answer, setAnswer] = useState<{
    hasAnswered: boolean;
    isCorrect: boolean;
  }>({ hasAnswered: false, isCorrect: false });
  const [Error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hintText, setHintText] = useState<string>();
  const Levels = [
    { name: "Easy", label: "Easy" },
    { name: "Medium", label: "Medium" },
    { name: "Hard", label: "Hard" },
  ];
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const handleLevelChosen = (LevelChosen: string) => {
    setLevel(LevelChosen);
    handleRequest(LevelChosen);
  };

  const handleRequest = async (LevelChosen: string) => {
    setIsLoading(true);
    let Result;
    try {
      Result = await vocabularyRequest(LevelChosen);
      setResponse(Result);
    } catch (error) {
      setError("מצטערים, אך אירעה שגיאה בעת יצירת הבקשה.");
    } finally {
      handleRandomAnswers(Result);
      setIsLoading(false);
    }
  };

  const handleRandomAnswers = (Result: VocabularyData) => {
    let tempFourAnswersArray = Result.words.map((word, index) => {
      let answersArray =
        level === "Hard"
          ? hardAnswersVocabulary()
          : level === "Medium"
          ? mediumAnswersVocabulary()
          : easyAnswersVocabulary();

      let correctIndex = Math.floor(Math.random() * 4);
      answersArray[correctIndex] = Result.answers[index];
      return answersArray;
    });

    setFourAnswersArray(tempFourAnswersArray);
  };

  const handleAnswerSubmit = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHintText("");
    const ChosenAnswer = event.target.value;
    setUserAnswer(ChosenAnswer);
    if (
      response.answers[currentIndex] ===
      fourAnswersArray[currentIndex][Number(ChosenAnswer)]
    ) {
      setAnswer({ hasAnswered: true, isCorrect: true });
      await studentSelfLearningAnswer(
        "vocabulary",
        response.words[currentIndex],
        response.answers[currentIndex],
        true
      );
    } else {
      setAnswer({ hasAnswered: true, isCorrect: false });
      await studentSelfLearningAnswer(
        "vocabulary",
        response.words[currentIndex],
        response.answers[currentIndex],
        false
      );
    }
  };

  const handleNextQuestion = () => {
    setIsLoading(true);
    setUserAnswer("");
    setAnswer({ hasAnswered: false, isCorrect: false });
    if (level) {
      if (currentIndex == 9) {
        setCurrentIndex(0);
        handleRequest(level);
      } else {
        setCurrentIndex(currentIndex + 1);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col justify-between p-4 h-full">
      <>
        {!level ? (
          <div className="flex flex-col m-1 sm:m-2 mb-4">
            <div className="text-base sm:text-xl text-black">
              Hello, choose the vocabulary level please.
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
                    <div className="text-xs sm:text-xs md:text-sm text-black">
                      <span className="text-darkRed font-semibold">Word: </span>
                      {response.words[currentIndex]}
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
                                {hintText}
                              </Label>
                            ) : null}
                          </div>
                          <Hint
                            setHintText={setHintText}
                            answerForHint={null}
                            textForHint={response.words[currentIndex]}
                            type="vocabulary"
                          />
                        </div>
                        <div className="mt-1">
                          <form>
                            {fourAnswersArray[currentIndex]?.map(
                              (answer, key) => (
                                <div className="flex items-center" key={key}>
                                  <label className="text-xs sm:text-xs md:text-sm mb-2">
                                    <input
                                      type="radio"
                                      name="answer"
                                      value={key}
                                      checked={userAnswer === key.toString()}
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
                              {fourAnswersArray[currentIndex]?.map(
                                (answer, key) => {
                                  if (
                                    response.answers[currentIndex] === answer
                                  ) {
                                    return (
                                      <div
                                        className="text-grayish text-center mx-1"
                                        key={key}
                                      >
                                        {answer}
                                      </div>
                                    );
                                  } else {
                                    return null;
                                  }
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
                              {fourAnswersArray[currentIndex]?.map(
                                (answer, key) => {
                                  if (
                                    response.answers[currentIndex] === answer
                                  ) {
                                    return (
                                      <div
                                        className="text-grayish text-center mx-1"
                                        key={key}
                                      >
                                        {answer}
                                      </div>
                                    );
                                  } else {
                                    return null;
                                  }
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
