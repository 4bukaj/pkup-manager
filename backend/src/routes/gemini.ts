import express from 'express';
import { GoogleGenAI } from '@google/genai';
import { chunkArray, getUserSettings } from '../utils';
import { config } from '../config';
import { AuthRequest } from '../middleware/auth';

const router = express.Router();
const genai = new GoogleGenAI({ apiKey: config.geminiApiKey });

const BATCH_SIZE = 10;
const MODEL_PREFERENCE = [
  'gemini-2.5-flash',
  'gemini-2.5-pro',
  'gemini-2.0-flash',
  'gemini-2.0-pro',
];

let cachedModels: string[] | null = null;

async function getAvailableModels(): Promise<string[]> {
  if (cachedModels) return cachedModels;

  const pager = await genai.models.list();
  const names: string[] = [];

  for await (const model of pager) {
    const name = model.name?.replace(/^models\//, '');

    if (
      name &&
      model.supportedActions?.includes('generateContent') &&
      name.startsWith('gemini-')
    ) {
      names.push(name);
    }
  }

  names.sort((a, b) => {
    const ai = MODEL_PREFERENCE.findIndex((p) => a.includes(p));
    const bi = MODEL_PREFERENCE.findIndex((p) => b.includes(p));
    const aRank = ai === -1 ? MODEL_PREFERENCE.length : ai;
    const bRank = bi === -1 ? MODEL_PREFERENCE.length : bi;
    return aRank - bRank;
  });

  cachedModels = names;
  return names;
}

function isRetryableError(error: unknown): boolean {
  if (error && typeof error === 'object' && 'status' in error) {
    const status = (error as { status: number }).status;
    return status === 429 || status === 404;
  }

  const msg = String(error);

  return (
    msg.includes('429') ||
    msg.includes('404') ||
    msg.toLowerCase().includes('quota') ||
    msg.toLowerCase().includes('rate limit') ||
    msg.toLowerCase().includes('not found')
  );
}

async function generateWithFallback(
  prompt: string,
  temperature: number
): Promise<string | undefined> {
  const models = await getAvailableModels();

  for (const model of models) {
    try {
      const result = await genai.models.generateContent({
        model,
        contents: prompt,
        config: { temperature },
      });
      return result.text;
    } catch (error) {
      if (isRetryableError(error) && model !== models[models.length - 1]) {
        console.warn(`Model ${model} unavailable, trying next...`);
        continue;
      }
      throw error;
    }
  }
}

router.post('/summarize-issues', async (req: AuthRequest, res) => {
  const { issues } = req.body;
  const { employee_name: employeeName } = await getUserSettings(req.user!.id);

  if (!issues || !Array.isArray(issues) || issues.length === 0) {
    return res.status(400).json({ error: 'Invalid or empty issues array' });
  }

  try {
    const batches = chunkArray(issues, BATCH_SIZE);
    const summaryMap: Record<string, string> = {};

    for (const batch of batches) {
      const batchPrompt = batch
        .map(
          (issue) => `
- Key: ${issue.key}
  Original Summary: ${issue.summary}
  Description: ${issue.description}`
        )
        .join('\n');

      const employeeClause = employeeName
        ? `The employee's name is "${employeeName}" — use it to infer grammatical gender and write summaries in first person using appropriate Polish verb forms (e.g. "zaimplementowałem/zaimplementowałam", "stworzyłem/stworzyłam", "usprawniłem/usprawniłam").`
        : `Write summaries in first person using masculine Polish verb forms (e.g. "zaimplementowałem", "stworzyłem", "usprawniłem").`;

      const prompt = `Jesteś doświadczonym project managerem przygotowującym raport PKUP (podwyższone koszty uzyskania przychodu). Dla każdego ticketu JIRA poniżej napisz rozbudowane podsumowanie wykonanej pracy (2–4 zdania).

Zasady:
- ${employeeClause}
- Skup się na tym, CO zostało zrobione i JAKI jest efekt — nie przepisuj suchych faktów technicznych.
- Pomijaj szczegóły implementacyjne bez wartości biznesowej: ścieżki endpointów, konkretne wartości pikseli, listy Acceptance Criteria itp.
- Używaj czasowników w pierwszej osobie: zaimplementowałem/am, stworzyłem/am, usprawniłem/am, opracowałem/am, zrefaktoryzowałem/am itp.
- Nie dodawaj JSON, Markdown ani bloków kodu.
- Formatuj każdą linię jako: KEY: Podsumowanie

Tickety:
${batchPrompt}
`;

      const text = await generateWithFallback(prompt, 0.3);
      if (!text) continue;

      text.split('\n').forEach((line) => {
        const colonIdx = line.indexOf(':');
        if (colonIdx === -1) return;
        const key = line.slice(0, colonIdx).trim();
        const summary = line.slice(colonIdx + 1).trim();
        if (key && summary) summaryMap[key] = summary;
      });
    }

    res.json(summaryMap);
  } catch (error) {
    console.error('Gemini error:', error);
    res.status(500).json({ error: 'Failed to generate summaries' });
  }
});

export default router;
