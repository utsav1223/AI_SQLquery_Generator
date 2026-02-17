const axios = require("axios");

exports.callGemini = async (promptText) => {
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [
        {
          parts: [{ text: promptText }]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 400
      }
    }
  );

  return response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
};
