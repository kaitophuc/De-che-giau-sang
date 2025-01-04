const OpenAI = require('openai');

const client = new OpenAI({
  // apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
  apiKey: 'process.env.OPENAI_API_KEY',
});

async function main() {
  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: 'user', content: 'Tell me something to make me happy' }],
    model: 'gpt-4o-mini',
  });
  console.log(chatCompletion.choices[0].message.content);
}

main();