// __tests__/api.test.ts
import {
    GrammarRequest,
    OpenQuestionsRequest,
    vocabularyRequest,
  } from '../lib/openai'
  
  // Mock the ChatOpenAI class
  jest.mock('@langchain/openai', () => {
    return {
      ChatOpenAI: jest.fn().mockImplementation(() => {
        return {
          invoke: jest.fn((prompt: string) => {
            if (prompt.includes('Generate a question with a grammatical error')) {
              return Promise.resolve({
                lc_kwargs: {
                  content: JSON.stringify({
                    mistake: 'This is a mistake.',
                    correct: 'This is correct.',
                  }),
                },
              })
            } else if (prompt.includes('please provide a short paragraph')) {
              return Promise.resolve({
                lc_kwargs: {
                  content: JSON.stringify({
                    paragraph: 'This is a paragraph.',
                    question: 'What is this?',
                    answers: ['A', 'B', 'C', 'D'],
                    correctAnswer: 'A',
                  }),
                },
              })
            } else if (prompt.includes('Please provide 10 English words')) {
              return Promise.resolve({
                lc_kwargs: {
                  content: JSON.stringify({
                    words: [
                      'word1',
                      'word2',
                      'word3',
                      'word4',
                      'word5',
                      'word6',
                      'word7',
                      'word8',
                      'word9',
                      'word10',
                    ],
                    answers: [
                      'translation1',
                      'translation2',
                      'translation3',
                      'translation4',
                      'translation5',
                      'translation6',
                      'translation7',
                      'translation8',
                      'translation9',
                      'translation10',
                    ],
                  }),
                },
              })
            } else {
              return Promise.reject(new Error('Unexpected prompt'))
            }
          }),
        }
      }),
    }
  })
  
  describe('API functions', () => {
    it('GrammarRequest should return a mistake and correct question', async () => {
      const result = await GrammarRequest('easy')
      expect(result).toEqual({
        mistake: 'This is a mistake.',
        correct: 'This is correct.',
      })
    })
  
    it('OpenQuestionsRequest should return a paragraph, question, answers, and correctAnswer', async () => {
      const result = await OpenQuestionsRequest('easy')
      expect(result).toEqual({
        paragraph: 'This is a paragraph.',
        question: 'What is this?',
        answers: ['A', 'B', 'C', 'D'],
        correctAnswer: 'A',
      })
    })
  
    it('vocabularyRequest should return words and their translations', async () => {
      const result = await vocabularyRequest('easy')
      expect(result).toEqual({
        words: [
          'word1',
          'word2',
          'word3',
          'word4',
          'word5',
          'word6',
          'word7',
          'word8',
          'word9',
          'word10',
        ],
        answers: [
          'translation1',
          'translation2',
          'translation3',
          'translation4',
          'translation5',
          'translation6',
          'translation7',
          'translation8',
          'translation9',
          'translation10',
        ],
      })
    })
  })