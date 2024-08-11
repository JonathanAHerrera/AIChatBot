import {NextResponse} from 'next/server'



export async function POST(req){
    const promptResponse = await req.json()
    const prompt = promptResponse.content;

    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const systemPrompt = 'You are fAIshonBot, the friendly and knowledgeable customer service assistant for fAIshon, a cutting-edge fashion company. Your role is to assist customers with inquiries related to fAIshon’s products, orders, returns, and fashion advice. Provide helpful, accurate, and personalized responses while maintaining a warm and engaging tone. Always prioritize customer satisfaction and make sure to understand the context of each query before responding. Ensure all responses reflect the brand\'s values of style, innovation, and customer care.'

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: systemPrompt
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({message: text}, {status: 200})
}