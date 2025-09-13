
import { GoogleGenAI, Type } from "@google/genai";
import { Question, ExamDomain } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const questionSchema = {
  type: Type.OBJECT,
  properties: {
    questionText: { type: Type.STRING, description: "The scenario-based question text." },
    questionType: { type: Type.STRING, enum: ['multiple-choice', 'multiple-response'], description: "The type of question, either 'multiple-choice' (one correct answer) or 'multiple-response' (two or more correct answers)." },
    options: {
      type: Type.ARRAY,
      description: "An array of 4-6 possible answers.",
      items: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING, description: "The text of the answer option." }
        },
        required: ["text"]
      }
    },
    correctAnswerIndices: {
      type: Type.ARRAY,
      description: "An array of numbers representing the 0-based index of the correct answer(s) in the 'options' array.",
      items: { type: Type.INTEGER }
    },
    explanation: {
      type: Type.STRING,
      description: "A detailed explanation of why the correct answer(s) are correct and the other options are incorrect. This should be comprehensive and educational."
    }
  },
  required: ["questionText", "questionType", "options", "correctAnswerIndices", "explanation"]
};

export const generateExamQuestions = async (domain: ExamDomain, numberOfQuestions: number): Promise<Question[]> => {
  try {
    const prompt = `
      You are an expert AWS exam question creator. Generate ${numberOfQuestions} difficult, scenario-based questions for the AWS Certified Solutions Architect - Associate (SAA-C03) exam.
      The questions must be from **${domain.title}**.
      Focus on topics like: ${domain.details.join(', ')}.
      Ensure you create a mix of 'multiple-choice' (one correct answer from 4 options) and 'multiple-response' (two or more correct answers from 5 or 6 options) questions.
      For each question, provide the question text, the type, a list of options, the indices of the correct answer(s), and a detailed explanation.
      Respond ONLY with a JSON object that matches the provided schema. The root of the JSON should be an array of question objects.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: questionSchema
        },
      },
    });
    
    const jsonStr = response.text.trim();
    const questions = JSON.parse(jsonStr) as Question[];
    return questions;

  } catch (error) {
    console.error("Error generating exam questions:", error);
    // Return a dummy question on error to prevent app crash
    return [{
        questionText: "Failed to load question from AI. Please check your API key and network connection. This is a sample question. Which service is a key-value database?",
        options: [{text: "RDS"}, {text: "DynamoDB"}, {text: "Redshift"}, {text: "S3"}],
        correctAnswerIndices: [1],
        explanation: "DynamoDB is a fully managed NoSQL key-value and document database.",
        questionType: 'multiple-choice'
    }];
  }
};

export const generateStudyGuide = async (domain: ExamDomain): Promise<string> => {
    try {
        const prompt = `
        You are an expert AWS instructor. Provide a concise but comprehensive study guide for the AWS Certified Solutions Architect - Associate (SAA-C03) exam, focusing on **${domain.title}**.
        Cover the key concepts under these topics: **${domain.details.join(', ')}**.
        Explain each key concept clearly and mention the primary AWS services related to it. Use practical examples where possible.
        Format the output as a simple string, using markdown-like syntax for headings (e.g., # Title), subheadings (e.g., ## Subtitle), bold text for key terms (**term**), and bullet points for lists (- item).
        Do not use code blocks or JSON.
        `;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });
        return response.text;
    } catch (error) {
        console.error("Error generating study guide:", error);
        return "Failed to generate study guide. Please check your API key and network connection.";
    }
};
