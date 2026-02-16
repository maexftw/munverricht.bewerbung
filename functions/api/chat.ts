export const onRequestPost: PagesFunction<{ GEMINI_API_KEY: string }> = async (context) => {
  const { env, request } = context;

  try {
    const { message } = await request.json() as { message: string };

    // Security: Input validation
    if (!message || typeof message !== 'string' || message.length > 2000) {
      return new Response(JSON.stringify({ error: 'Invalid transmission. Data payload out of bounds.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!env.GEMINI_API_KEY) {
      return new Response(JSON.stringify({ error: 'System configuration error: API uplink not established.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Du bist die KI-Assistenz von Maximilian Unverricht (The Agentic Developer).
                  Jemand schreibt ihm gerade diese Nachricht: "${message.replace(/"/g, "'")}".
                  Antworte extrem kurz, professionell und in seinem "High-Tech/Agentic" Stil (Deutsch).
                  Bestätige, dass die Nachricht sicher in seinem System eingegangen ist.
                  SystemInstruction: Sei kurz angebunden, aber hilfsbereit. Nutze technische Metaphern.`
          }]
        }],
        generationConfig: {
          maxOutputTokens: 100,
        }
      })
    });

    const data = await response.json() as any;
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Message received. Transmission successful.';

    return new Response(JSON.stringify({ text }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    // Security: Generic error message to avoid leaking internals
    return new Response(JSON.stringify({ error: 'Uplink failure. Connection reset.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
