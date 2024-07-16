'use client'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { OpenQuestionsRequest } from '@/lib/openai'
import { useState } from 'react'
import HashLoader from 'react-spinners/HashLoader'

export default function OpenQuestionsContent() {
  const [level, setLevel] = useState<string | null>(null)
  const [response, setResponse] = useState({
    paragraph: '',
    question: '',
    answers: ['1', '2', '3', '4'],
    correctAnswer: '',
  })
  const [userAnswer, setUserAnswer] = useState('')
  const [answer, setAnswer] = useState<{
    hasAnswered: boolean
    isCorrect: boolean
  }>({ hasAnswered: false, isCorrect: false })
  const [Error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const Levels = [
    { name: 'Easy', label: 'Easy' },
    { name: 'Medium', label: 'Medium' },
    { name: 'Hard', label: 'Hard' },
  ]
  const handleLevelChosen = (LevelChosen: string) => {
    setLevel(LevelChosen)
    handleRequest(LevelChosen)
  }

  const handleRequest = async (LevelChosen: string) => {
    setIsLoading(true)
    try {
      const Result = await OpenQuestionsRequest(LevelChosen)
      setResponse(Result)
    } catch (error) {
      setError('מצטערים, אך אירעה שגיאה בעת יצירת הבקשה.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAnswerSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ChosenAnswer = event.target.value
    setUserAnswer(ChosenAnswer)
    if (ChosenAnswer == response.correctAnswer) {
      setAnswer({ hasAnswered: true, isCorrect: true })
    } else {
      setAnswer({ hasAnswered: true, isCorrect: false })
    }
  }

  const handleNextQuestion = () => {
    setIsLoading(true)
    setUserAnswer('')
    setAnswer({ hasAnswered: false, isCorrect: false })
    if (level) {
      handleRequest(level)
    }
  }

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
                  onClick={() => handleLevelChosen('Hard')}>
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
                      <span className="text-darkRed font-semibold">
                        Paragraph:{' '}
                      </span>
                      {response.paragraph}
                    </div>
                    <div className="text-xs sm:text-xs md:text-sm text-black py-1">
                      <span className="text-darkRed font-semibold">
                        Question:{' '}
                      </span>
                      {response.question}
                    </div>
                    {!answer.hasAnswered ? (
                      <div className="text-xs sm:text-xs md:text-sm py-2">
                        <Label className=" text-darkRed font-medium">
                          Select the right answer:
                        </Label>
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
                                          ? 'bg-grayish border-black'
                                          : 'bg-lightBeige'
                                      }`}
                                      aria-hidden="true"></span>
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
                              dir="rtl">
                              צודק, תשובה נכונה ✓
                            </div>
                            <div
                              className="flex text-xs sm:text-xs md:text-sm text-black py-1 justify-center"
                              dir="rtl">
                              <span className="text-grayish font-semibold mx-1">
                                תשובה נכונה:{' '}
                              </span>
                              {Object.entries(response.answers).map(
                                ([key, value]) => {
                                  if (response.correctAnswer === key) {
                                    return (
                                      <div
                                        className="text-grayish text-center mx-1"
                                        key={key}>
                                        {value}
                                      </div>
                                    )
                                  }
                                  return null
                                }
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col text-sm sm:text-sm md:text-base">
                            <div
                              className="text-lg sm:text-2xl text-darkRed font-semibold text-center pt-2"
                              dir="rtl">
                              טעות ✘
                            </div>
                            <div
                              className="flex justify-center text-grayish py-1 mx-1"
                              dir="rtl">
                              התשובה הנכונה היא :
                              {Object.entries(response.answers).map(
                                ([key, value]) => {
                                  if (response.correctAnswer === key) {
                                    return (
                                      <div
                                        className="text-grayish mx-1"
                                        key={key}>
                                        {value}
                                      </div>
                                    )
                                  }
                                  return null
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
            variant={'outline'}
            className="bg-lightBeige border border-lightRed rounded-full text-lightRed"
            onClick={() => handleNextQuestion()}>
            שאלה הבאה
          </Button>
        </div>
      )}
    </div>
  )
}
