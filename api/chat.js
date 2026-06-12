// api/chat.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, messages: providedMessages } = req.body;

    let apiMessages;
    if (providedMessages && Array.isArray(providedMessages)) {
      apiMessages = providedMessages;
    } else if (message) {
      apiMessages = [
        {
          role: "system",
          content: "You are the Impact QI Assistant. Answer questions about Mohammed Ali, publications, research, public health, documentaries and widening participation."
        },
        { role: "user", content: message }
      ];
    } else {
      return res.status(400).json({ error: "Missing message or messages" });
    }

    // Your OpenRouter API key must be set in Vercel environment variables
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3-0324:free", // free model
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter error:", errorText);
      return res.status(502).json({ error: "AI service error" });
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: error.message });
  }
}