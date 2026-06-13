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

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error("OPENROUTER_API_KEY is missing");
      return res.status(500).json({ error: "Server misconfiguration: API key missing" });
    }

    // ✅ Working free model on OpenRouter
    const model = "openrouter/free";

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("Invalid JSON from OpenRouter:", responseText);
      return res.status(502).json({ error: `Invalid response from AI service: ${responseText.substring(0, 200)}` });
    }

    if (!response.ok) {
      console.error("OpenRouter error details:", data);
      const errorMsg = data.error?.message || JSON.stringify(data);
      return res.status(502).json({ error: `OpenRouter error: ${errorMsg}` });
    }

    const reply = data.choices?.[0]?.message?.content;
    if (!reply) {
      console.error("No reply in OpenRouter response:", data);
      return res.status(502).json({ error: "No reply from AI service" });
    }

    res.status(200).json({ reply });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: error.message });
  }
}