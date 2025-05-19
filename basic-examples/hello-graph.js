
import { StateGraph, START, END } from "@langchain/langgraph";

// 1. Define the state schema correctly
// Note: StateGraph constructor expects a specific format for the schema
const stateSchema = {
  // Define each key in the state with its appropriate type
  greeting: {
    value: "", // Default value (optional)
  }
};

// 2. Define the initial state
const initialState = {
  greeting: "from LangGraph!",
};

// 3. Node function
const greetNode = async (state) => {
  return {
    ...state,
    greeting: "Hello world, " + state.greeting,
  };
};

// 4. Create graph with state schema
const builder = new StateGraph({ channels: stateSchema });

// 5. Add node and define flow
builder.addNode("greet", greetNode);
builder.addEdge(START, "greet");
builder.addEdge("greet", END);

// 6. Compile and execute
const graph = builder.compile();

// 7. Run the graph
async function runGraph() {
  const result = await graph.invoke(initialState);
  console.log("Result:", result);
  // Output will be: Result: { greeting: 'Hello world, from LangGraph!' }
}

runGraph().catch(console.error);
