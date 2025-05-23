//Parse pdf File
import {LlamaParseReader} from "llamaindex";
import dotenv from 'dotenv';
dotenv.config();

async function main() {
    // save the file linked above as sf_budget.pdf, or change this to match
    const path = "attention-is-all you-need-1.pdf";
  
    // set up the llamaparse reader
    const reader = new LlamaParseReader({ resultType: "markdown" });
  
    // parse the document
    const documents = await reader.loadData(path);
  
    // print the parsed document
    console.log(documents)
  }
  
 main().catch(console.error); 


