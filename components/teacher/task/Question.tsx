"use client";

import { Button } from "@/components/ui/button";
import {
  GrammarRequest,
  OpenQuestionsRequest,
  vocabularyRequest,
  vocabularyRequestSingle,
} from "@/lib/openai";
import { Question } from "@prisma/client";
import { useEffect, useState } from "react";
import GrammarQuestion from "./GrammarQuestion";
import OpenQuestion from "./OpenQuestion";
import VocabularyQuestion from "./VocabularyQuestion";
import HashLoader from "react-spinners/HashLoader";
import {
  easyAnswersVocabulary,
  hardAnswersVocabulary,
  mediumAnswersVocabulary,
} from "@/lib/vocabulary-random";

interface QuestionComponentProps {
  questionArr: Question[];
  setQuestionArr: React.Dispatch<React.SetStateAction<Question[]>>;
  currentPage: number;
  level: string;
  selectedQuestionType: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

interface VocabularyData {
  words: string[];
  answers: string[];
  currect: string;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  questionArr,
  setQuestionArr,
  currentPage,
  level,
  selectedQuestionType,
  setCurrentPage,
}) => {
  const [Error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [CurrentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [flagQuestion, setFlagQuestion] = useState<boolean>(false);
  const [responseVocabulary, setResponseVocabulary] = useState<VocabularyData>({
    words: [],
    answers: [],
    currect: "",
  });
  const [responseOpenQuestions, setResponseOpenQuestions] = useState({
    paragraph: "",
    question: "",
    answers: ["1", "2", "3", "4"],
    correctAnswer: 1,
  });
  const [responseGrammar, setResponseGrammar] = useState({
    mistake: "",
    correct: "",
  });

  useEffect(() => {
    setCurrentQuestion(questionArr[currentPage - 1] || null);
  }, [questionArr, currentPage]);

  const handleDeleteQuestion = () => {
    const newQuestionArr = questionArr.filter(
      (_, index) => index !== currentPage - 1
    );
    setQuestionArr(newQuestionArr);
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const handleSaveQuestion = () => {
    const newQuestion: Question = {
      id: "",
      level: level,
      type: selectedQuestionType,
      text: "",
      correctAnswer: "",
      falseAnswer1: null,
      falseAnswer2: null,
      falseAnswer3: null,
    };

    switch (selectedQuestionType) {
      case "grammar":
        newQuestion.text = responseGrammar.mistake;
        newQuestion.correctAnswer = responseGrammar.correct;
        break;
      case "vocabulary":
        newQuestion.text = responseVocabulary.words.join(", ");
        newQuestion.correctAnswer = responseVocabulary.answers[0];
        newQuestion.falseAnswer1 = responseVocabulary.answers[1];
        newQuestion.falseAnswer2 = responseVocabulary.answers[2];
        newQuestion.falseAnswer3 = responseVocabulary.answers[3];
        break;
      case "openQuestions":
        newQuestion.text = `Text: ${responseOpenQuestions.paragraph}, Question: ${responseOpenQuestions.question}`;
        newQuestion.correctAnswer = responseOpenQuestions.answers[0];
        newQuestion.falseAnswer1 = responseOpenQuestions.answers[1];
        newQuestion.falseAnswer2 = responseOpenQuestions.answers[2];
        newQuestion.falseAnswer3 = responseOpenQuestions.answers[3];
        break;
    }
    setQuestionArr([...questionArr, newQuestion]);
    setCurrentQuestion(newQuestion);
  };

  const handleRandomAnswers = (result: VocabularyData): string[][] => {
    return result.words.map((word, index) => {
      const answersArray =
        level === "Hard"
          ? hardAnswersVocabulary()
          : level === "Medium"
          ? mediumAnswersVocabulary()
          : easyAnswersVocabulary();

      const correctIndex = Math.floor(Math.random() * 4);
      answersArray[correctIndex] = result.answers[index];
      return answersArray
        .filter((answer) => answer !== result.answers[index])
        .slice(0, 3);
    });
  };

  const handleGenerateQuestion = async () => {
    setIsLoading(true);
    try {
      let result;
      switch (selectedQuestionType) {
        case "grammar":
          result = await GrammarRequest(level);
          setResponseGrammar(result);
          break;
        case "vocabulary":
          result = await vocabularyRequestSingle(level);
          const tempFourAnswersArray = handleRandomAnswers(result);
          setResponseVocabulary({
            words: result.words,
            answers: [result.answers[0], ...tempFourAnswersArray[0]],
            currect: result.answers[0],
          });
          break;
        case "openQuestions":
          result = await OpenQuestionsRequest(level);
          setResponseOpenQuestions(result);
          break;
      }
    } catch (error) {
      setError("מצטערים, אך אירעה שגיאה בעת יצירת הבקשה.");
    } finally {
      setFlagQuestion(true);
      setIsLoading(false);
    }
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
          {!Error ? (
            <>
              {CurrentQuestion ? (
                <>
                  {CurrentQuestion.type === "grammar" && (
                    <GrammarQuestion
                      responseGrammar={{
                        mistake: CurrentQuestion.text,
                        correct: CurrentQuestion.correctAnswer,
                      }}
                    />
                  )}
                  {CurrentQuestion.type === "openQuestions" && (
                    <OpenQuestion
                      responseOpenQuestions={{
                        paragraph: CurrentQuestion.text
                          .split(", Question: ")[0]
                          .split(": ")[1],
                        question: CurrentQuestion.text.split(", Question: ")[1],
                        answers: [
                          CurrentQuestion.correctAnswer,
                          CurrentQuestion.falseAnswer1!,
                          CurrentQuestion.falseAnswer2!,
                          CurrentQuestion.falseAnswer3!,
                        ],
                        correctAnswer: 0,
                      }}
                    />
                  )}
                  {CurrentQuestion.type === "vocabulary" && (
                    <VocabularyQuestion
                      responseVocabulary={{
                        words: CurrentQuestion.text.split(", "),
                        answers: [
                          CurrentQuestion.correctAnswer,
                          CurrentQuestion.falseAnswer1!,
                          CurrentQuestion.falseAnswer2!,
                          CurrentQuestion.falseAnswer3!,
                        ],
                      }}
                    />
                  )}
                </>
              ) : (
                <>
                  {selectedQuestionType === "grammar" && flagQuestion && (
                    <GrammarQuestion responseGrammar={responseGrammar} />
                  )}
                  {selectedQuestionType === "openQuestions" && flagQuestion && (
                    <OpenQuestion
                      responseOpenQuestions={responseOpenQuestions}
                    />
                  )}
                  {selectedQuestionType === "vocabulary" && flagQuestion && (
                    <VocabularyQuestion
                      responseVocabulary={responseVocabulary}
                    />
                  )}
                </>
              )}
            </>
          ) : (
            <p className="text-darkRed text-xxs py-2" dir="rtl">
              {Error}
            </p>
          )}
          <div className="flex space-x-8 justify-center items-end w-4/5 p-4 mt-auto">
            {CurrentQuestion && (
              <Button
                variant={"outline"}
                className="bg-lightBeige border border-lightRed rounded-md text-lightRed hover:bg-grayish/50"
                dir="rtl"
                onClick={() => handleDeleteQuestion()}
              >
                מחיקת שאלה ❌
              </Button>
            )}
            {!CurrentQuestion && flagQuestion && (
              <Button
                variant={"outline"}
                className="bg-lightBeige border rounded-md border-green-400 text-green-400 hover:bg-grayish/50"
                dir="rtl"
                onClick={() => handleSaveQuestion()}
              >
                שמירת שאלה ⬇
              </Button>
            )}
            <Button
              variant={"outline"}
              className="bg-lightBeige border rounded-md border-black text-black hover:bg-grayish/50"
              dir="rtl"
              onClick={() => handleGenerateQuestion()}
            >
              יצירת שאלה חדשה ✚
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default QuestionComponent;
