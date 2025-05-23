import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from 'dotenv';

dotenv.config();  

const api = process.env.GOOGLE_API_KEY;
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  apiKey: api,
  temperature: 0
});

const res = await model.invoke("Hello, Gemini!")
console.log(res.content)