import { graph } from './searchAgentGraph.js';

//const userInput = "What AI and education conferences are happening this year";
const userInput = "What are the current trends in generative AI tools for education in 2025?";

const initialState = {
  messages: [
    {
      type: "human",
      content: userInput,
    },
  ],
};

const run = async () => {
  try {
    const result = await graph.invoke(initialState);
    console.log("Conversación final:");
    result.messages
    .filter(msg => msg.getType() === "human" || msg.getType() === "ai")
    .forEach((msg, i) => {
      console.log(`\nMensaje ${i + 1} (${msg.getType()}):\n`, msg.content);
    });

    } catch (err) {
      console.error("Error al ejecutar el grafo:", err);
    }
};

run();
