import { WebSocketServer } from 'ws';
import { getModel, createChain, answerQuestion } from './ai.mjs';

const wss = new WebSocketServer({ port:3001 });


wss.on('connection', (ws) => {
  console.log('WS Connected');
  ws.on('error', console.error);

  ws.on('message', async (data) => {
    const stringData = data.toString();

    // This should be JSON
    let JSONmessage;
    try {
      JSONmessage = JSON.parse(stringData);
    } catch(err) {
      console.log(err);
    }

    console.log('Query from the Client', JSONmessage);

    console.log('Starting to Ask', new Date());
    const answerStream = await answerQuestion(JSONmessage, '12345');

    for await (const chunk of answerStream) {
      console.log(`Got Chat Response: ${chunk.content}`);

      //'{"type":"token","token":" Hello","source":""}'
      const formattedAnswer = {
        type: 'token',
        token: chunk.content,
        source: ''
      };

      ws.send(JSON.stringify(formattedAnswer));
    }

    console.log('Done Asking', new Date());
  });

  // AI Related Setup
  const model = getModel();
  createChain(model);
});

wss.on('close', () => {
  console.log('WS connection Closed');
});

