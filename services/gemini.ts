const SYSTEM_INSTRUCTION = `
Eres "María", la asistente virtual experta de Huele Que Flipas, una tienda online de perfumes de equivalencia premium.

IDENTIDAD DE MARCA
- Hablas como una experta cercana, juvenil, segura y con personalidad.
- Tu tono es natural, claro, útil y vendedor, pero sin agobiar.
- No suenas robótica ni técnica.
- Puedes usar emojis de forma puntual, sin abusar.

DATOS REALES DEL NEGOCIO
- Marca: Huele Que Flipas
- Localización: San Martín de la Vega, Madrid
- Experiencia: más de 10 años
- Calidad: equivalencias muy logradas, larga duración, calidad top
- Fabricado en España
- Envío 24/48h
- Envío barato: 1,50€
- Regalo de muestras en pedidos
- Pago: el pedido se confirma por WhatsApp y el pago es por Bizum
- María es la experta de la marca y ayuda a elegir perfume

MISIÓN
- Ayudar a cada cliente a encontrar el perfume ideal según gustos, ocasión y estilo.
- Resolver dudas de forma breve, útil y orientada a compra.
- Llevar la conversación hacia recomendación concreta + cierre por WhatsApp cuando tenga sentido.

INSTRUCCIONES IMPORTANTES
1. Sé cercana, clara y convincente.
2. Si el usuario dice qué tipo de aroma le gusta (dulce, fresco, intenso, elegante, limpio, sexy, etc.), recomiéndale perfiles que encajen.
3. Si el usuario menciona un perfume original concreto, intenta recomendar la equivalencia correspondiente SOLO si estás segura del número.
4. Si NO sabes con seguridad el número de equivalencia, NO lo inventes. Di claramente que no quieres inventárselo y pídele una referencia más o sugiérele escribir por WhatsApp para confirmarlo.
5. No inventes stock, precios de productos concretos, tamaños raros, promociones no confirmadas ni datos técnicos no dados.
6. Sí puedes mencionar siempre estos beneficios reales:
   - envío 24/48h
   - envío 1,50€
   - muestras de regalo
   - larga duración
   - fabricado en España
   - más de 10 años de experiencia
7. Si la persona duda entre varios estilos, haz una mini recomendación comparando.
8. Si la intención de compra es clara, sugiere cerrar pedido por WhatsApp de forma natural.
9. Si preguntan por duración, explica que depende también de piel, clima y tipo de aroma, pero que trabajamos equivalencias con muy buena duración.
10. Si preguntan por hombre, mujer o unisex, adapta el lenguaje a esa familia.
11. Responde normalmente en 2 a 6 frases. Si la pregunta lo pide, puedes alargarte un poco.
12. Nunca digas que eres una IA salvo que te lo pregunten directamente.
13. Si te preguntan algo fuera de perfumes o de la tienda, reconduce con amabilidad.

EJEMPLOS DE TONO
- "Si te gustan los perfumes dulces e intensos, aquí hay opciones que huelen brutal."
- "Ese perfil suele gustar muchísimo si buscas algo elegante, duradero y que deje huella."
- "No quiero inventarte el número exacto, pero si me dices el perfume original te ayudo a afinarlo."

OBJETIVO FINAL
- Recomendar bien
- transmitir confianza
- acercar al usuario a compra
`;

type HistoryItem = {
  role: 'user' | 'model';
  text?: string;
  parts?: { text: string }[];
};

type GlobalWithEnv = typeof globalThis & {
  API_KEY?: string;
  process?: {
    env?: {
      API_KEY?: string;
      VITE_GEMINI_API_KEY?: string;
    };
  };
};

function getApiKey(): string {
  const g = globalThis as GlobalWithEnv;

  const fromGlobal = (g.API_KEY || '').toString().trim();
  const fromProcessApiKey = (g.process?.env?.API_KEY || '').toString().trim();
  const fromVite = (g.process?.env?.VITE_GEMINI_API_KEY || '').toString().trim();

  return fromProcessApiKey || fromVite || fromGlobal || '';
}

function normalizeHistory(history: HistoryItem[] = []) {
  return history
    .filter((item) => {
      const text = item?.text || item?.parts?.[0]?.text || '';
      return Boolean(text.toString().trim());
    })
    .map((item) => ({
      role: item.role,
      parts: [
        {
          text: (item.text || item.parts?.[0]?.text || '').toString().trim(),
        },
      ],
    }));
}

function getFallbackResponse(message: string): string {
  const text = message.toLowerCase();

  if (text.includes('dulce')) {
    return 'Si te gustan dulces, aquí hay opciones que suelen gustar muchísimo: perfiles vainilla, ámbar o más golosos. Si quieres, dime si lo prefieres más sexy, elegante o más potente y te afino mejor 😉';
  }

  if (text.includes('fresco')) {
    return 'Si buscas algo fresco, te recomendaría tirar a perfumes más limpios, ligeros y fáciles de llevar a diario. Dime si lo quieres para hombre, mujer o unisex y te oriento mejor.';
  }

  if (text.includes('intenso') || text.includes('duradero')) {
    return 'Si lo quieres intenso y con buena duración, lo ideal es ir a perfiles ambarados, especiados, vainilla, maderas o perfumes árabes. Si me dices para quién es, te digo por dónde tiraría yo.';
  }

  if (text.includes('unisex')) {
    return 'Si buscas unisex, tienes una categoría muy buena para eso: aromas elegantes, equilibrados y con mucha personalidad. Cuéntame si lo quieres más limpio, dulce o con más presencia y te guío.';
  }

  if (text.includes('hombre')) {
    return 'Si buscas perfume de hombre, te puedo orientar según estilo: fresco, elegante, intenso, sexy o todoterreno. Dime el rollo que buscas y te digo opciones que encajan muy bien.';
  }

  if (text.includes('mujer')) {
    return 'Si buscas perfume de mujer, te puedo orientar según perfil: dulce, limpio, floral, elegante o con más huella. Dime cuál te gusta más y te ayudo a afinar.';
  }

  return 'Ahora mismo el chat inteligente no está conectado 🙏 Pero si me dices si lo quieres dulce, fresco, intenso, elegante, limpio o unisex, te ayudo igual a encontrar uno que te encaje.';
}

export async function getChatResponse(
  message: string,
  history: HistoryItem[] = []
): Promise<string> {
  try {
    const cleanMessage = message.trim();

    if (!cleanMessage) {
      return 'Cuéntame qué tipo de perfume te gusta y te ayudo a encontrar uno que encaje contigo.';
    }

    const apiKey = getApiKey();

    if (!apiKey) {
      return getFallbackResponse(cleanMessage);
    }

    const mod: any = await import('@google/genai');
    const GoogleGenAI = mod.GoogleGenAI;

    const ai = new GoogleGenAI({ apiKey });

    const contents = [
      ...normalizeHistory(history),
      {
        role: 'user',
        parts: [{ text: cleanMessage }],
      },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
        topP: 0.95,
      },
    });

    const text = response?.text?.trim();

    if (!text) {
      return 'Ahora mismo no he podido responderte bien. Dime qué tipo de perfume te gusta y te recomiendo uno que huela brutal.';
    }

    return text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    return '¡Ups! Ahora mismo el chat está fallando 😅 Pero si me dices si lo buscas dulce, fresco, intenso, elegante o unisex, te sigo ayudando por aquí. Y si quieres cerrar pedido, por WhatsApp te atendemos genial.';
  }
}
