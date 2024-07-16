'use server'
import { ChatOpenAI } from '@langchain/openai'

const chatModel = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const generatePrompt = async (Prompt: string) => {
  const response = await chatModel.invoke(Prompt)
  return JSON.parse(response.lc_kwargs.content as string)
}

export const OpenQuestionsRequest = async (LevelChosen: string) => {
  const prompt = `Given the level "${LevelChosen}", please provide a short paragraph on a topic suitable for this level, followed by a related question. Format your response in JSON with the following keys: "paragraph" for your text, "question" for your query, and "answers" for an array of four options. Include only one correct answer and return the key of this answer in "correctAnswer"`
  const Result = await generatePrompt(prompt)
  return Result
}
