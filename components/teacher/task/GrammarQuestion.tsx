interface GrammarQuestionProps {
  responseGrammar: {
    mistake: string;
    correct: string;
  };
}

const GrammarQuestion = ({ responseGrammar }: GrammarQuestionProps) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="text-xs sm:text-xs md:text-sm text-black">
          <span className="text-darkRed font-semibold">Mistake: </span>
          {responseGrammar.mistake}
        </div>
        <div className="text-xs sm:text-xs md:text-sm text-black">
          <span className="text-darkRed font-semibold">Correct: </span>
          {responseGrammar.correct}
        </div>
      </div>
    </>
  );
};

export default GrammarQuestion;
