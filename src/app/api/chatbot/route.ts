import { NextResponse } from 'next/server';
import {
  ALL_INDIAN_LANGUAGES,
  GREETINGS_BY_LANG,
  POPULAR_QUESTIONS_BY_LANG,
  getChatbotResponse
} from '@/lib/chatbotKnowledge';

export async function GET() {
  return NextResponse.json({
    success: true,
    totalLanguages: ALL_INDIAN_LANGUAGES.length,
    languages: ALL_INDIAN_LANGUAGES,
    defaultGreetings: GREETINGS_BY_LANG,
    popularQuestions: POPULAR_QUESTIONS_BY_LANG
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { query, langCode = 'hi' } = body;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    const response = getChatbotResponse(query, langCode);

    return NextResponse.json({
      success: true,
      data: response
    });
  } catch (error) {
    console.error('Chatbot API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat query' },
      { status: 500 }
    );
  }
}
