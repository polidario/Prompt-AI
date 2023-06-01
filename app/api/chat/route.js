import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

export async function POST(request) {
	try {
		const body = await request.json();

		const configuration = new Configuration({
			apiKey: process.env.OPENAI_API_KEY,
		});

		const openai = new OpenAIApi(configuration);

		const completion = await openai.createChatCompletion(body);

		const data = completion.data;

		//return new Response(completion.data, { status: 200 });
		return NextResponse.json({ data });
	} catch(err) {
		return new Response(err, { status: 500 });
	}
}