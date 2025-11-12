import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.API_KEY_FARM,
});

export async function POST(request: NextRequest) {
  try {
    if (!process.env.API_KEY_FARM) {
      console.error('API_KEY_FARM is not set');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const { message, conversationHistory } = await request.json();

    const systemPrompt = `You are FarmMart Assistant, a helpful AI for an agricultural e-commerce platform. You help with:
- Farming advice (planting, soil management, crop care, pest control)
- Product recommendations for farm products
- Order and shipping information
- General customer support

Be friendly, concise, and helpful. Keep responses under 150 words. If asked about products, recommend checking the products page. For orders, mention 2-5 day shipping. For support, provide support@farmmart.com.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message },
    ];

    const completion = await groq.chat.completions.create({
      messages: messages.map(msg => ({
        role: msg.role as 'system' | 'user' | 'assistant',
        content: msg.content
      })),
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 300,
    });

    const response = completion.choices[0]?.message?.content || 
      "I'm sorry, I couldn't process that. Could you try again?";

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to get response' },
      { status: 500 }
    );
  }
}

