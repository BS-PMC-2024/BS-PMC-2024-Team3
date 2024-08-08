interface OpenQuestionProps {
  responseOpenQuestions: {
    paragraph: string;
    question: string;
    answers: string[];
    correctAnswer: number;
  };
}

const OpenQuestion = ({ responseOpenQuestions }: OpenQuestionProps) => {
  return (
    <div className="flex flex-col">
      <div className="text-xs sm:text-xs md:text-sm text-black">
        <span className="text-darkRed font-semibold">Paragraph: </span>
        {responseOpenQuestions.paragraph}
      </div>
      <div className="text-xs sm:text-xs md:text-sm text-black">
        <span className="text-darkRed font-semibold">Question: </span>
        {responseOpenQuestions.question}
      </div>
      <div className="text-xs sm:text-xs md:text-sm text-black">
        <span className="text-darkRed font-semibold">Answers: </span>
        {responseOpenQuestions.answers.map((answer, index) => (
          <div key={index}>
            {index + 1}
            {". "}
            {answer}
          </div>
        ))}
      </div>
      <div className="text-xs sm:text-xs md:text-sm text-black">
        <span className="text-darkRed font-semibold">Correct Answer: </span>
        {responseOpenQuestions.answers[responseOpenQuestions.correctAnswer]}
      </div>
    </div>
  );
};

export default OpenQuestion;
