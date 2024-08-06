"use server";
import { ChatOpenAI } from "@langchain/openai";

const chatModel = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generatePrompt = async (Prompt: string) => {
  const response = await chatModel.invoke(Prompt);
  return JSON.parse(response.lc_kwargs.content as string);
};

export const GrammarRequest = async (LevelChosen: string) => {
  const prompt = `Generate a question with a grammatical error appropriate for ${LevelChosen} level, 
and provide the correct version of the question. Return the response in the following JSON format:
{
    "mistake": "<incorrect question>",
    "correct": "<correct question>"
}`;
  const Result = await generatePrompt(prompt);
  return Result;
};

export const OpenQuestionsRequest = async (LevelChosen: string) => {
  const prompt = `Given the level "${LevelChosen}", please provide a short paragraph on a topic suitable for this level, followed by a related question. Format your response in JSON with the following keys: "paragraph" for your text, "question" for your query, and "answers" for an array of four options numbered from 1 to 4. Include only one correct answer and return the key of this answer in "correctAnswer"`;
  const Result = await generatePrompt(prompt);
  return Result;
};

export const vocabularyRequest = async (LevelChosen: string) => {
  const prompt = `Please provide 10 English words at the ${LevelChosen} difficulty level in JSON format. The JSON object should contain two arrays: 'words' for the English words and 'answers' for their Hebrew translations, where each translation corresponds to its respective word.`;
  const Result = await generatePrompt(prompt);
  return Result;
};

export const vocabularyRequestSingle = async (LevelChosen: string) => {
  console.log("start");
  const prompt = `Please provide one English word at the ${LevelChosen} difficulty level in JSON format. The JSON object should contain two arrays: 'words' for the single English word and 'answers' for the single Hebrew translations.`;
  const Result = await generatePrompt(prompt);
  return Result;
};

export const getHint = async (
  textForHint: string,
  answerForHint: string | null,
  Type: string
) => {
  let prompt;
  switch (Type.toLowerCase()) {
    case "vocabulary":
      prompt = `Provide a hint for the English word "${textForHint}" and how its commonly used,The hint should be provided in Hebrew .the answer need to return in JSON format.The JSON object should include the following key: 'Hint' and his value will be the hint.`;
      break;
    case "grammar":
      prompt = `Provide a hint to correct the grammatical error in the following sentence: “${textForHint}”. Specify where the error is located, and use the correct version of the sentence: “${answerForHint}” as a reference without revealing the correct answer.\n
      The hint should be provided in Hebrew.\n
      The hint should be in JSON format.\n 
      The JSON object should include the following key: 'Hint' and his value will be the hint.`;
      break;
    case "openquestion":
      prompt = `answer - "${answerForHint}", question - "${textForHint} : \n.
      Based on the answer provided, create a context clue in Hebrew that will help correctly refer to the text and question specified. The hint should help in understanding the answer. Make sure the clue provides useful context or a hint without revealing the answer directly.
      The hint should be provided in Hebrew.\n
      The hint should be in JSON format.\n 
      The JSON object should include the following key: 'Hint' and his value will be the hint`;
      break;
    default:
      return { error: "Unknown type" };
  }
  const Result = await generatePrompt(prompt);
  return Result;
};
