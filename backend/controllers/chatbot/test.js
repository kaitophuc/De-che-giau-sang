const OpenAI = require('openai');

const client = new OpenAI({
  // apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
  apiKey: 'sk-svcacct-jVg5vE58zZCb6i1958GdBhXUefrp3GHG3TwvqkfTa8_cxnd3vui131TuwQMVk2070d7c7T3BlbkFJAd4NmQVikug8Tu90jXFI_dgpwPAo2ISTWNc55sbUcJCtUtTohxpBsnuMF24ofchOuZ1AA',
});

async function main() {
  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: 'user', content: 'Tell me something to make me happy' }],
    model: 'gpt-4o-mini',
  });
  console.log(chatCompletion.choices[0].message.content);
}

main();