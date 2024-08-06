interface VocabularyQuestionProps {
  responseVocabulary: {
    words: string[];
    answers: string[];
  };
}

const VocabularyQuestion = ({
  responseVocabulary,
}: VocabularyQuestionProps) => {
  return (
    <div className="flex flex-col">
      <div className="text-xs sm:text-xs md:text-sm text-black">
        <span className="text-darkRed font-semibold">Words: </span>
        {responseVocabulary.words.join(", ")}
      </div>
      <div className="text-xs sm:text-xs md:text-sm text-black">
        <span className="text-darkRed font-semibold">Answers: </span>
        {responseVocabulary.answers.join(", ")}
      </div>
    </div>
  );
};

export default VocabularyQuestion;
