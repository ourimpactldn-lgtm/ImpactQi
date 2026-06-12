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

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: apiMessages
      })
    });

    const data = await response.json();
    res.status(200).json({ reply: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}