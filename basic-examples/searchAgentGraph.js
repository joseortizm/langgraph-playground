// ejemplo de uso en archivo runSearch.js
import { ChatOpenAI } from "@langchain/openai";
import { TavilySearch } from "@langchain/tavily";
import { ToolNode } from '@langchain/langgraph/prebuilt';
import dotenv from "dotenv";
import {
  StateGraph,
  MessagesAnnotation,
  END,
  START
} from "@langchain/langgraph";

dotenv.config();

const llm = new ChatOpenAI({
  model: "gpt-4o",
  temperature: 0,
});

const webSearchTool = new TavilySearch({
  maxResults: 5,
  topic: "general",
});

const tools = [webSearchTool];

const toolNode = new ToolNode(tools) // https://langchain-ai.github.io/langgraphjs/how-tos/tool-calling/?h=tool+node#define-tools

const callModel = async (state) => {
  const { messages } = state;
  const llmWithTools = llm.bindTools(tools);
  const result = await llmWithTools.invoke(messages);

  // Mostrar si el modelo decidió usar Tavily
  console.log("Respuesta del modelo:");
  console.log(JSON.stringify(result, null, 2));
  if (result.tool_calls && result.tool_calls.length > 0) {
    console.log("El modelo decidió usar una herramienta.");
    result.tool_calls.forEach((call, index) => {
      console.log(`🔧 Tool Call #${index + 1}:`);
      console.log("📎 Nombre:", call.name);  // Aquí debería decir "tavily_search"
      console.log("Argumentos:", call.args);
    });
  } else {
    console.log("El modelo respondió directamente sin usar herramientas.");
  }
  //
  
  return { messages: [result] };
};

// Función que decide si seguir o terminar
const shouldContinue = (state) => {
  const { messages } = state;
  const lastMessage = messages[messages.length - 1];

  // Comprueba si el tipo del último mensaje NO es de inteligencia artificial (ai)
  // Verifica si el mensaje NO tiene llamadas a herramientas (tool_calls) o si la lista está vacía.
  if (
    lastMessage._getType() !== "ai" ||
    !(lastMessage.tool_calls && lastMessage.tool_calls.length)
  ) {
    //END: indica que el flujo o la conversación debe terminar porque no hay más herramientas que llamar ni más pasos que seguir.
    return END;
  }
  // el if no se cumple (es decir, el último mensaje es de AI y tiene llamadas a herramientas), devuelve "tools".
  return "tools";
};

const workflow = new StateGraph(MessagesAnnotation)
  .addNode("agent", callModel)
  .addEdge(START, "agent")
  .addNode("tools", toolNode)
  .addEdge("tools", "agent")
  .addConditionalEdges("agent", shouldContinue, ["tools", END]);

export const graph = workflow.compile();







