import { ChatOpenAI } from "@langchain/openai";
import { TavilySearch } from "@langchain/tavily";
import { ToolNode } from '@langchain/langgraph/prebuilt';
import { AIMessage } from '@langchain/core/messages';
import {
  StateGraph,
  MessagesAnnotation,
  END,
  START
} from "@langchain/langgraph";

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










