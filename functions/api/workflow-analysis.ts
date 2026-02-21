export async function onRequestPost(context: any) {
  const { request, env } = context;

  try {
    const { message } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: 'No message provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = env.API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Du bist das System zur Workflow-Analyse von Maximilian Unverricht (The Advanced Developer).
                      Jemand schreibt ihm gerade diese Nachricht: "${message}".
                      Antworte extrem kurz, professionell und in seinem "Modern Workflow" Stil (Deutsch).
                      Bestätige, dass die Nachricht sicher in seinem System eingegangen ist.

                      Systemanweisung: Sei kurz angebunden, aber hilfsbereit. Nutze technische Metaphern.`
              }
            ]
          }
        ],
        generationConfig: {
          maxOutputTokens: 100,
        }
      }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return new Response(JSON.stringify({ error: 'Failed to generate response', details: errorData }), {
            status: response.status,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const data: any = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Message received. System link established.';

    return new Response(JSON.stringify({ text }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
