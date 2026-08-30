import  axios  from 'axios';
import readline from 'readline/promises';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const LOGIN_URL = 'http://localhost:3000/api/auth/login';
const AI_CHAT_URL = 'http://localhost:3000/api/ai-chat';

async function typeWriter(text) {
  process.stdout.write('AI: ');
  for (const char of text) {
    process.stdout.write(char);
    await new Promise(resolve => setTimeout(resolve, 25));
  }
  process.stdout.write('\n\n');
}

async function startChat() {
  console.log( '--- Fitness AI Terminal Client ---');
  
  let AUTH_TOKEN = null;
  let sessionId = null;

  try {
    const email = await rl.question('Email: ');
    const password = await rl.question('Password: ');

    const authResponse = await axios.post(LOGIN_URL, { email, password });

    AUTH_TOKEN = authResponse.data.data.data.tokens.accessToken; 

    if (!AUTH_TOKEN) {
      console.log( ' Login Failed: Access token not found in response.');
      rl.close();
      return;
    }


  } catch (error) {
    console.error( ' Login Error: ' + (error.response?.data?.message || error.message));
    rl.close();
    return;
  }

  while (true) {
    const userInput = await rl.question('You: ');

    if (userInput.toLowerCase() === 'exit') {
      console.log('Goodbye!');
      break;
    }

    if (!userInput.trim()) continue;

    try {
      const res = await axios.post(
        AI_CHAT_URL,
        { message: userInput, sessionId: sessionId },
        { headers: { Authorization: `Bearer ${AUTH_TOKEN}` } }
      );
      const {  response:aiText, sessionId:newSessionId } = res.data.data
      sessionId = newSessionId; 

      await typeWriter(aiText);

    } catch (error) {
      console.error( ' Chat Error: ' + (error.response?.data?.message || error.message));
      console.log(''); 
    }
  }

  rl.close();
}

startChat();