const { ChatOpenAI } = await import("@langchain/openai");
import { ChatPromptTemplate } from "@langchain/core/prompts";

export function getModel(options = {}) {
  return new ChatOpenAI({
    temperature: options.temperature || process.env.TEMPERATURE || 0.9,
    openAIApiKey: options.openAIApiKey || process.env.OPEN_AI_AP_KEY || 'EMPTY',
    modelName: options.modelName || process.env.AI_MODEL_NAME || 'mistral'
  }, {
    baseURL: options.baseURL || process.env.AI_BASE_URL || 'http://localhost:8000/v1'
  });
}


export function createChain(model) {
  ////////////////////////////////
  // CREATE CHAIN
  const prompt = ChatPromptTemplate.fromMessages([
    [ 'system',
      'You are a helpful, respectful and honest assistant named "Parasol Assistant".' +
      'You work for Parasol Insurance.' +
      'Your response must look like the following JSON:' +

      '"subject": "Subject of your response, suitable to use as an email subject line."' +
      '"message": "Response text that summarizes the information they gave, and asks for any other missing information needed from Parasol."'

    ],
    [ 'human', '{input}' ]
  ]);

  const chain = prompt.pipe(model);

  return chain;
}

export async function answerQuestion(chain, claim) {
  console.log(claim);
  const result = await chain.invoke(
    { input: claim }
  );

  return result;
}



// @SystemMessage("""
//   You are a helpful, respectful and honest assistant named "Parasol Assistant".
  
//   You work for Parasol Insurance.
  
//   Your response must look like the following JSON:
  
//   {
//     "subject": "Subject of your response, suitable to use as an email subject line.",
//     "message": "Response text that summarizes the information they gave, and asks for any other missing information needed from Parasol."
//   }
//   """)


// EmailResponse chat(@UserMessage String claim);