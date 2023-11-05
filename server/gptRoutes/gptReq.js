const router = require("express").Router();
const dotenv = require("dotenv");
const axios = require("axios");
const { OpenAI } = require("openai");

dotenv.config();

router.get("/", async (req, res) => {
  let gptResponse = await fetchRes(req.query.transcript_text);
  res.send(gptResponse);
});

async function fetchRes(transcript_text) {
  const prompt =
    `
    The following is either a conversation, description or other related content types. Consider it a meeting or such and event and give 
    me it's minutes.
    \n\n
    ${transcript_text} 
`; // Include your prompt here

  console.log(prompt);
  max_tokens = 200;
  const openai = new OpenAI({
    // apiKey: process.env.OPENAI_SECRET_KEY
    apiKey: "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",
  });

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
  return response.choices[0].message.content;
}

// SAMPLE REQUEST OBJECT FOR COMPLETION

// const response = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [{"role": "system", "content": "You are a helpful assistant."},
//         {"role": "user", "content": "Who won the world series in 2020?"},
//         {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
//         {"role": "user", "content": "Where was it played?"}],
//   });

// SAMPLE RESPONSE OBJECT FOR COMPLETION

// {
//     "choices": [
//       {
//         "finish_reason": "stop",
//         "index": 0,
//         "message": {
//           "content": "The 2020 World Series was played in Texas at Globe Life Field in Arlington.",
//           "role": "assistant"
//         }
//       }
//     ],
//     "created": 1677664795,
//     "id": "chatcmpl-7QyqpwdfhqwajicIEznoc6Q47XAyW",
//     "model": "gpt-3.5-turbo-0613",
//     "object": "chat.completion",
//     "usage": {
//       "completion_tokens": 17,
//       "prompt_tokens": 57,
//       "total_tokens": 74
//     }
// }

module.exports = router;
