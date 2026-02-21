export const onRequestPost = async (context: any) => {
  const { request, env } = context;

  try {
    const { message } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const API_KEY = env.API_KEY;
    if (!API_KEY) {
      console.error('API_KEY is not configured');
      return new Response(JSON.stringify({ error: 'System configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Using the REST API to avoid external dependencies in the Worker environment
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a technical assistant for a High-Performance Workflow System.
                        Someone is sending a message to the lead developer: "${message}".
                        Respond extremely briefly, professionally and in a high-tech style (German).
                        Confirm that the message has been securely logged in the system.`,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 100,
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Upstream API error:', errorText);
      throw new Error('Upstream communication failed');
    }

    const data: any = await response.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Message logged. Transmission successful.';

    return new Response(JSON.stringify({ text: resultText }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Chat function error:', err);
    return new Response(JSON.stringify({ error: 'Uplink failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
