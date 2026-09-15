export interface LLMRequest {
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
  responseFormat?: 'json' | 'text';
}

export class AIService {
  private get groqKey(): string | undefined {
    return process.env.GROQ_API_KEY?.trim();
  }

  private get geminiKey(): string | undefined {
    return process.env.GEMINI_API_KEY?.trim();
  }

  private get openaiKey(): string | undefined {
    return process.env.OPENAI_API_KEY?.trim();
  }

  public get isLiveApiConfigured(): boolean {
    return Boolean(this.groqKey || this.geminiKey || this.openaiKey);
  }

  public async generateStructuredJSON<T>(request: LLMRequest, fallbackGenerator: () => T): Promise<T> {
    // 1. Try Groq (Fastest, low latency Llama-3.3-70B)
    if (this.groqKey) {
      try {
        console.log('⚡ Calling Groq API with Llama-3.3-70B...');
        const result = await this.callGroq(request);
        const parsed = this.safeParseJSON<T>(result);
        if (parsed) {
          console.log('✅ Groq response successfully parsed as structured JSON.');
          return parsed;
        }
      } catch (err) {
        console.warn('⚠️ Groq generation failed, attempting next provider:', (err as Error).message);
      }
    }

    // 2. Try Google Gemini
    if (this.geminiKey) {
      try {
        console.log('⚡ Calling Google Gemini API (gemini-1.5-flash)...');
        const result = await this.callGemini(request);
        const parsed = this.safeParseJSON<T>(result);
        if (parsed) {
          console.log('✅ Gemini response successfully parsed as structured JSON.');
          return parsed;
        }
      } catch (err) {
        console.warn('⚠️ Gemini generation failed, attempting next provider:', (err as Error).message);
      }
    }

    // 3. Try OpenAI
    if (this.openaiKey) {
      try {
        console.log('⚡ Calling OpenAI API (gpt-4o-mini)...');
        const result = await this.callOpenAI(request);
        const parsed = this.safeParseJSON<T>(result);
        if (parsed) {
          console.log('✅ OpenAI response successfully parsed as structured JSON.');
          return parsed;
        }
      } catch (err) {
        console.warn('⚠️ OpenAI generation failed:', (err as Error).message);
      }
    }

    // 4. Built-in Deterministic Domain Agent Fallback (zero-crash guarantee)
    console.log('ℹ️ Running in resilient Decision Engine mode (fallback or zero-key mode).');
    return fallbackGenerator();
  }

  private safeParseJSON<T>(text: string): T | null {
    try {
      // Remove any markdown code blocks ```json ... ```
      let cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      const firstBrace = cleaned.indexOf('{');
      const lastBrace = cleaned.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        cleaned = cleaned.substring(firstBrace, lastBrace + 1);
      }
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

    if (!res.ok) {
      const errText = await res.text().catch(() => res.statusText);
      throw new Error(`Groq API error (${res.status}): ${errText}`);
    }
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

    if (!res.ok) {
      const errText = await res.text().catch(() => res.statusText);
      throw new Error(`Gemini API error (${res.status}): ${errText}`);
    }
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

    if (!res.ok) {
      const errText = await res.text().catch(() => res.statusText);
      throw new Error(`OpenAI API error (${res.status}): ${errText}`);
    }
    const data = (await res.json()) as any;
    return data.choices?.[0]?.message?.content ?? '';
  }
}

export const aiService = new AIService();
