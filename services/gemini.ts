const SYSTEM_INSTRUCTION = `
Eres "Huele Que Flipas Bot", el asistente virtual de María, la dueña de la perfumería "Huele Que Flipas" vinculada a Lokeyokeria.es.
Tu objetivo es ayudar a los clientes a elegir su perfume de equivalencia ideal.

Datos clave sobre el negocio:
- Localización: San Martín de la Vega, Madrid.
- Experiencia: 10 años en el sector nos avalan.
- Calidad: Máxima duración y fidelidad al aroma original.
- Pago: Exclusivamente por Bizum.
- María es la fundadora y experta que supervisa todo.
- Estilo: Juvenil, fresco, directo ("que flipes").
- Envío nacional 3€ (Correos Express)

Instrucciones:
1. Sé amable, cercano y profesional.
2. Si preguntan por un perfume original, recomiéndale nuestra equivalencia mencionando el número (ej. "Para Black Opium usa nuestro 167").
3. Explica que el pago es por Bizum para mayor facilidad.
4. Recuerda que enviamos desde San Martín de la Vega a toda España.
5. Usa un tono entusiasta.
Responde de forma concisa y usa emojis ocasionalmente.
`;

type HistoryItem = { role: 'user' | 'model'; parts: { text: string }[] };

function getApiKey(): string {
  // En navegador, process.env suele NO existir.
  // Si algún día guardas la key en globalThis.API_KEY, también la cogerá.
  const g: any = globalThis as any;
  const fromGlobal = (g?.API_KEY || '').toString().trim();

  // Si existe process (algunos entornos), lo intentamos sin romper:
  const fromProcess = (g?.process?.env?.API_KEY || '').toString().trim();

  return fromProcess || fromGlobal || '';
}

export async function getChatResponse(message: string, history: HistoryItem[] = []) {
  try {
    const apiKey = getApiKey();

    // ✅ Sin API key: NO llamamos a Gemini y NO se rompe nada
    if (!apiKey) {
      return 'Ahora mismo el chat IA no está conectado 🙏 Dime si lo quieres dulce, fresco o intenso y te recomiendo uno por número 😉';
    }

    // ✅ Import dinámico: si @google/genai falla, NO tumba el preview
    const mod: any = await import('@google/genai');
    const GoogleGenAI = mod.GoogleGenAI;

    const ai = new GoogleGenAI({ apiKey });

    const contents = [
      ...(history || []),
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7
      }
    });

    return response?.text || 'Ahora mismo no puedo responder, prueba otra vez 🙏';
  } catch (error) {
    console.error('Gemini API Error:', error);
    return '¡Ups! Ahora mismo el chat está fallando 😅 Prueba en un momento o escríbenos por WhatsApp.';
  }
}
