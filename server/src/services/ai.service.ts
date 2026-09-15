export interface LLMRequest {
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
  responseFormat?: 'json' | 'text';
}

export class AIService {
  private groqKey = process.env.GROQ_API_KEY;
  private geminiKey = process.env.GEMINI_API_KEY;
  private openaiKey = process.env.OPENAI_API_KEY;
  private isDemoMode = process.env.DEMO_MODE !== 'false';

  public async generateStructuredJSON<T>(request: LLMRequest, fallbackGenerator: () => T): Promise<T> {
    // If external keys are provided and demo mode is not forced, attempt live call
    if (this.groqKey) {
      try {
        const result = await this.callGroq(request);
        const parsed = this.safeParseJSON<T>(result);
        if (parsed) return parsed;
      } catch (err) {
        console.warn('Groq generation fallback triggered:', (err as Error).message);
      }
    }

    if (this.geminiKey) {
      try {
        const result = await this.callGemini(request);
        const parsed = this.safeParseJSON<T>(result);
        if (parsed) return parsed;
      } catch (err) {
        console.warn('Gemini generation fallback triggered:', (err as Error).message);
      }
    }

    if (this.openaiKey) {
      try {
        const result = await this.callOpenAI(request);
        const parsed = this.safeParseJSON<T>(result);
        if (parsed) return parsed;
      } catch (err) {
        console.warn('OpenAI generation fallback triggered:', (err as Error).message);
      }
    }

    // High quality deterministic domain agent fallback
    return fallbackGenerator();
  }

  private safeParseJSON<T>(text: string): T | null {
    try {
      // Remove any markdown code blocks ```json ... ```
      const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned) as T;
    } catch {
      return null;
    }
  }

  private async callGroq(request: LLMRequest): Promise<string> {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.groqKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: request.systemPrompt },
          { role: 'user', content: request.userPrompt }
        ],
        temperature: request.temperature ?? 0.3,
        response_format: request.responseFormat === 'json' ? { type: 'json_object' } : undefined
      })
    });

    if (!res.ok) throw new Error(`Groq API error: ${res.statusText}`);
    const data = (await res.json()) as any;
    return data.choices?.[0]?.message?.content ?? '';
  }

  private async callGemini(request: LLMRequest): Promise<string> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.geminiKey}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: `${request.systemPrompt}\n\nUser Request: ${request.userPrompt}` }
            ]
          }
        ],
        generationConfig: {
          temperature: request.temperature ?? 0.3,
          responseMimeType: request.responseFormat === 'json' ? 'application/json' : 'text/plain'
        }
      })
    });

    if (!res.ok) throw new Error(`Gemini API error: ${res.statusText}`);
    const data = (await res.json()) as any;
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  }

  private async callOpenAI(request: LLMRequest): Promise<string> {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.openaiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: request.systemPrompt },
          { role: 'user', content: request.userPrompt }
        ],
        temperature: request.temperature ?? 0.3,
        response_format: request.responseFormat === 'json' ? { type: 'json_object' } : undefined
      })
    });

    if (!res.ok) throw new Error(`OpenAI API error: ${res.statusText}`);
    const data = (await res.json()) as any;
    return data.choices?.[0]?.message?.content ?? '';
  }
}

export const aiService = new AIService();
