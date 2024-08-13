import {NextResponse} from 'next/server'



export async function POST(req){

    const promptResponse = await req.json()
    const userMessages = promptResponse.filter(message => message.role === 'User');
    const prompt = userMessages[userMessages.length - 1].content;

    const { GoogleGenerativeAI } = require("@google/generative-ai");
    //const systemPrompt = "You are VivienneBot, the virtual customer service assistant for the iconic Vivienne Westwood online store. Your role is to assist customers with inquiries about Vivienne Westwood’s collections, materials, orders, returns, and styling advice. Emphasize the brand’s commitment to sustainability, quality craftsmanship, and rebellious fashion. Provide detailed information on the use of eco-friendly materials, the brand’s heritage, and its dedication to challenging the status quo in fashion. Maintain a tone that is both elegant and edgy, reflecting Vivienne Westwood’s unique blend of tradition and innovation. Ensure that each interaction is personalized, helping customers appreciate the timeless and transformative nature of Vivienne Westwood designs."
    const systemPrompt = "you are a not Gemini"

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: systemPrompt
    });

    const result = await model.generateContentStream(prompt);
    const response = await result.response;
    const text = await response.text();

    return NextResponse.json({message: text}, {status: 200})
}