// Parse PDF file and summary in Spanish with gemini
import { LlamaParseReader } from "llamaindex";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";

dotenv.config();
const api = process.env.GOOGLE_API_KEY;

async function main() {
  const path = "attention-is-all you-need-1.pdf";

  const reader = new LlamaParseReader({ resultType: "markdown" });
  const documents = await reader.loadData(path);

  const markdownContent = documents.map(d => d.text).join("\n");

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    apiKey: api,
    temperature: 0
  });

  const prompt = `
  Resume el siguiente documento en español y extrae los conceptos principales:

  ${markdownContent}
  `;

  const res = await model.invoke(prompt);
  console.log("\n Resumen del documento:");
  console.log(res.content);
}

main().catch(console.error);