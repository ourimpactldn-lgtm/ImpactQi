const siteFocus = [
  "research",
  "public health",
  "community impact",
  "widening participation",
  "documentary",
  "film",
  "storytelling",
  "automation",
  "ai",
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

export function buildProfessionalReply(message) {
  const text = (message || "").toLowerCase().trim();

  if (!text) {
    return "Hello and thank you for your message. I can help with questions about research, public health, film production, automation, and training. If you would like, I can also point you to the most relevant section of this site.";
  }

  if (containsAny(text, ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"])) {
    return "Hello and thank you for reaching out. I am the Impact QI Assistant and I can help with questions about research, public health, documentary storytelling, AI automation, and training. If you would like, I can also suggest the most relevant section of this page for your interest.";
  }

  if (containsAny(text, ["who are you", "what do you do", "what is impact qi", "about this site"])) {
    return "I am the Impact QI Assistant. I help visitors understand our work in research, public health, documentary film, digital transformation, and professional training. I can answer questions about our services, suggest relevant content, or help you decide whether a project or conversation would be a good fit.";
  }

  if (containsAny(text, ["quote", "pricing", "cost", "proposal", "contact", "book", "conversation", "enquire"])) {
    return "We would be pleased to discuss your requirements in more detail. For a tailored proposal, please share your goals, timeline, and the scale of the work you have in mind. We can then advise on the most suitable approach for research, automation, training, or film production.";
  }

  if (containsAny(text, ["automation", "ai", "workflow", "digital transformation", "power automate", "copilot", "process"] )) {
    return "Our approach to automation focuses on practical, people-centred solutions that reduce admin burden and improve service delivery. We can support organisations with workflow design, intelligent automation, and digital tools that make complex processes easier to manage and scale.";
  }

  if (containsAny(text, ["film", "documentary", "storytelling", "video", "interview"])) {
    return "We support documentary and storytelling work that is clear, engaging, and rooted in purpose. This can include interviews, narrative development, production support, and content that helps organisations communicate impact in a compelling way.";
  }

  if (containsAny(text, ["research", "publication", "evaluation", "impact", "evidence", "report", "guidance", "chapter", "magazine"])) {
    return "We work with evidence, research, and evaluation to help organisations make sense of complex information and communicate it effectively. That includes publications, guidance, impact reporting, and structured analysis that supports informed decision-making.";
  }

  if (containsAny(text, ["training", "workshop", "edi", "equity", "digital skills", "ai literacy", "capability"])) {
    return "We provide training and capability building that is practical and accessible. This includes workshops on AI literacy, digital skills, inclusive practice, and the confidence needed to use new tools responsibly and effectively.";
  }

  if (containsAny(text, ["public health", "community", "widening participation", "social impact"])) {
    return "Public health and community impact are central to our work. We support initiatives that strengthen participation, improve communication, and build insight around health, inclusion, and meaningful engagement with communities.";
  }

  if (containsAny(text, ["internet", "beyond", "general", "outside", "broader", "other topics"])) {
    return "Yes, I can help with broader questions as well as site-specific enquiries. I can provide a professional overview, practical guidance, and suggest the most relevant next step whether that is a short explanation, a tailored recommendation, or a conversation with the team.";
  }

  if (containsAny(text, siteFocus)) {
    return "Thank you for your question. Based on the work shown on this site, I can help with practical guidance in research, public health, filmmaking, automation, and training. If you would like a more tailored answer, I can also help you frame your request for a consultation or proposal.";
  }

  return "I do not have that information at the moment. Please ask something else or contact us directly if you would like a tailored response.";
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
    return res.status(200).json({ reply: buildProfessionalReply(message) });
  } catch (error) {
    console.error("Chat API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}