import { getModel, createChain, answerQuestion } from "./email-ai.mjs";

async function emailRoute (fastify, options) {
  fastify.post('/api/email', async (request, reply) => {
    console.log(request.body.text);
    const model = getModel();
    const chain = createChain(model);
    console.log('Starting to Ask', new Date());
    const answer = await answerQuestion(chain, request.body.text);
    console.log(answer);
    console.log('Done Asking', new Date());
    return answer;
  });
}

export default emailRoute;