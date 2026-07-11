const quoteFormUrl = "https://forms.office.com/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAa__fCewOVUMUg0RVRNMzNNNEpBU1BGTEhKWDZGTFo2OS4u&route=shorturl";

const siteFocus = [
  "research",
  "public health",
  "community impact",
  "widening participation",
  "documentary",
  "film",
  "storytelling",
  "automation",
  "workflow",
  "digital transformation",
  "training",
  "edi",
  "digital skills",
  "ai literacy",
];

function containsAny(text, terms) {
  return terms.some((term) => text.includes(term));
}

function withQuotePrompt(reply) {
  return `${reply}\n\nIf you would like a tailored proposal or to discuss your needs in more detail, please use our request form: ${quoteFormUrl}`;
}

function normalizeText(message) {
  return (message || "").toLowerCase().trim();
}

function getFaqReply(message) {
  const text = normalizeText(message);

  if (!text) {
    return { reply: withQuotePrompt("Hello and thank you for your message. I can help with questions about research, public health, film production, automation, and training. If you would like, I can also point you to the most relevant section of this site."), matched: false };
  }

  if (containsAny(text, ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"])) {
    return { reply: withQuotePrompt("Hello and thank you for reaching out. I am the Impact QI Assistant and I can help with questions about research, public health, documentary storytelling, AI automation, and training. If you would like, I can also suggest the most relevant section of this page for your interest."), matched: true };
  }

  if (containsAny(text, ["who are you", "what do you do", "what is impact qi", "about this site"])) {
    return { reply: withQuotePrompt("I am the Impact QI Assistant. I help visitors understand our work in research, public health, documentary film, digital transformation, and professional training. I can answer questions about our services, suggest relevant content, or help you decide whether a project or conversation would be a good fit."), matched: true };
  }

  if (containsAny(text, ["quote", "pricing", "cost", "proposal", "contact", "book", "conversation", "enquire"])) {
    return { reply: withQuotePrompt("We would be pleased to discuss your requirements in more detail. For a tailored proposal, please share your goals, timeline, and the scale of the work you have in mind. We can then advise on the most suitable approach for research, automation, training, or film production."), matched: true };
  }

  if (containsAny(text, ["automation", "workflow", "digital transformation", "power automate", "copilot", "process", "automate", "automated", "intelligent automation"])) {
    return { reply: withQuotePrompt("Our approach to automation focuses on practical, people-centred solutions that reduce admin burden and improve service delivery. We can support organisations with workflow design, intelligent automation, and digital tools that make complex processes easier to manage and scale."), matched: true };
  }

  if (containsAny(text, ["film", "documentary", "storytelling", "video", "interview"])) {
    return { reply: withQuotePrompt("We support documentary and storytelling work that is clear, engaging, and rooted in purpose. This can include interviews, narrative development, production support, and content that helps organisations communicate impact in a compelling way."), matched: true };
  }

  if (containsAny(text, ["research", "publication", "evaluation", "impact", "evidence", "report", "guidance", "chapter", "magazine"])) {
    return { reply: withQuotePrompt("We work with evidence, research, and evaluation to help organisations make sense of complex information and communicate it effectively. That includes publications, guidance, impact reporting, and structured analysis that supports informed decision-making."), matched: true };
  }

  if (containsAny(text, ["training", "workshop", "edi", "equity", "digital skills", "ai literacy", "capability"])) {
    return { reply: withQuotePrompt("We provide training and capability building that is practical and accessible. This includes workshops on AI literacy, digital skills, inclusive practice, and the confidence needed to use new tools responsibly and effectively."), matched: true };
  }

  if (containsAny(text, ["public health", "community", "widening participation", "social impact"])) {
    return { reply: withQuotePrompt("Public health and community impact are central to our work. We support initiatives that strengthen participation, improve communication, and build insight around health, inclusion, and meaningful engagement with communities."), matched: true };
  }

  if (containsAny(text, ["internet", "beyond", "general", "outside", "broader", "other topics"])) {
    return { reply: withQuotePrompt("Yes, I can help with broader questions as well as site-specific enquiries. I can provide a professional overview, practical guidance, and suggest the most relevant next step whether that is a short explanation, a tailored recommendation, or a conversation with the team."), matched: true };
  }

  if (containsAny(text, siteFocus)) {
    return { reply: withQuotePrompt("Thank you for your question. Based on the work shown on this site, I can help with practical guidance in research, public health, filmmaking, automation, and training. If you would like a more tailored answer, I can also help you frame your request for a consultation or proposal."), matched: true };
  }

  return { reply: buildFallbackReply(message), matched: false };
}

function buildFallbackReply(message) {
  const text = normalizeText(message);
  const topicHints = [];

  if (containsAny(text, ["automation", "workflow", "digital transformation", "power automate", "copilot", "process", "automate", "automated", "intelligent automation"])) {
    topicHints.push("automation and AI");
  }

  if (containsAny(text, ["film", "documentary", "storytelling", "video", "interview"])) {
    topicHints.push("film and storytelling");
  }

  if (containsAny(text, ["research", "publication", "evaluation", "impact", "evidence", "report", "guidance"])) {
    topicHints.push("research and evaluation");
  }

  if (containsAny(text, ["training", "workshop", "edi", "digital skills", "ai literacy", "capability"])) {
    topicHints.push("training and capability building");
  }

  if (containsAny(text, ["public health", "community", "widening participation", "social impact"])) {
    topicHints.push("public health and community impact");
  }

  const topicHint = topicHints.length
    ? `It sounds like you may be asking about ${topicHints.slice(0, 2).join(" or ")}.`
    : "I can help with a broad range of questions about our work.";

  return withQuotePrompt(`${topicHint} I can help you with a more tailored answer if you share a bit more detail about your goal, audience, or challenge. If this is a specific enquiry, I can suggest the right next step or help you prepare for a conversation with the team.`);
}

export function buildProfessionalReply(message) {
  return getFaqReply(message).reply;
}

async function getAiFallbackReply(message, fallbackReply) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return fallbackReply;
  }

  const endpoint = "https://openrouter.ai/api/v1/chat/completions";
  const model =
  process.env.OPENAI_MODEL || "openai/gpt-4o-mini";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: "You are a professional assistant for Impact QI. Answer questions about research, public health, documentary storytelling, automation, training, and digital transformation. Keep answers concise, helpful, and relevant to the site. If the user asks something outside the scope, offer a practical next step and invite a more detailed conversation.",
        },
        {
          role: "user",
          content: `User question: ${message}\n\nIf a simple FAQ answer exists, use it as context and expand it into a helpful, professional response.`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
console.error(error);
throw new Error(error);
  }

  const data = await response.json();
  const aiReply = data.choices?.[0]?.message?.content?.trim();

  return aiReply || fallbackReply;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const { reply: faqReply, matched: faqMatched } = getFaqReply(message);
    let reply = faqReply;
    let mode = "faq";

  if (!faqMatched && process.env.OPENROUTER_API_KEY) {
      try {
        reply = await getAiFallbackReply(message, faqReply);
        mode = "ai";
      } catch (error) {
        console.warn("AI fallback failed, using FAQ reply instead:", error);
      }
    }

    return res.status(200).json({ reply, mode, faqMatched });
  } catch (error) {
    console.error("Chat API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}