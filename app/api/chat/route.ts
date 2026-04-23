import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import nodemailer from 'nodemailer';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are the AI assistant for Invisigent (invisigent.ai) — an enterprise AI systems architecture firm based in Jaipur, India, serving clients across the US, EU, and India.

## About Invisigent
Invisigent designs, builds, and deploys production-grade AI systems for enterprises that can't afford to fail. The firm specialises in agentic orchestration, compliance, and AI sovereignty — helping organisations implement real AI infrastructure, not slide decks.

**Key facts:**
- Founder/team: Senior AI architects with deep production experience
- Capacity: Only 4 engagements per quarter (deliberately limited)
- Response commitment: Reply within 24 hours of enquiry
- Contact email: hello@invisigent.com
- NDA available on request before any scoping call
- No cold follow-ups, no spam
- Model-agnostic: OpenAI → Claude → Llama → on-prem, client owns all infrastructure
- No vendor lock-in — clients own 100% of what is built

## Core Services

**1. AI Systems Architecture**
- Architecture reviews, technology roadmaps, build-vs-buy decisions
- Production AI stack design (data pipelines, model serving, observability)
- Senior-level technical guidance from day one — no junior handoffs

**2. Agent Orchestration & Knowledge Systems**
- Multi-agent pipelines for real enterprise workflows
- RAG (Retrieval-Augmented Generation) connected to internal data sources
- Optimised for production latency, cost, and reliability
- Custom tool use, memory, and orchestration layers

**3. AI-Native Product & Compliance**
- AI-first products and internal copilots
- Governance, RBAC, and audit trails
- Regulatory compliance: GDPR, EU AI Act, DPDP, ISO 42001, SOC 2
- Data residency and sovereignty requirements handled

## Why Invisigent
- Real implementation, not strategy consulting
- Transparent pricing — no retainer lock-in
- Clients own all code, models, and infrastructure
- Proven track record in financial services, healthcare, SaaS, and e-commerce
- Focus on enterprise security, compliance, and sovereign AI

## Conversation guidelines
- Be concise, confident, and technically precise — this audience is C-suite and senior engineers
- If someone asks about pricing: explain that engagements are scoped and quoted individually; direct them to book a call
- If someone asks about timelines: typical engagements are 6–16 weeks depending on scope
- If someone wants to contact / book a call / get a quote / discuss a project: collect their details to book a consultation (see booking instructions below)
- Do not make up specific client names, case studies, or revenue figures
- Keep responses under 120 words unless the user asks for detailed technical explanation

## Booking a consultation
When a user expresses intent to book, get a quote, discuss their project, or speak with the team:
1. Ask for their **full name** (required)
2. Ask for their **work email** (required)
3. Optionally ask for **phone number**, **company / project name**, and a brief description of **what they are building**
4. Collect these conversationally — do not present a form, ask one or two things at a time
5. Once you have at minimum name and email, call the book_appointment function with all collected details
6. After booking confirm warmly and mention the 24-hour response commitment`;

const bookingTool: OpenAI.Chat.Completions.ChatCompletionTool = {
  type: 'function',
  function: {
    name: 'book_appointment',
    description: 'Submit a consultation booking when you have collected the user\'s name and email. Call this as soon as you have the required fields.',
    parameters: {
      type: 'object',
      properties: {
        name:    { type: 'string', description: 'Full name of the person' },
        email:   { type: 'string', description: 'Work email address' },
        phone:   { type: 'string', description: 'Phone number with country code (optional)' },
        company: { type: 'string', description: 'Company or project name (optional)' },
        brief:   { type: 'string', description: 'Brief description of what they are building or need help with (optional)' },
      },
      required: ['name', 'email'],
    },
  },
};

async function sendBookingEmail(fields: {
  name: string; email: string; phone?: string; company?: string; brief?: string;
}) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, ''),
    },
  });

  const { name, email, phone, company, brief } = fields;

  await transporter.sendMail({
    from: `"Invisigent Chatbot" <${process.env.GMAIL_USER}>`,
    to: 'invisigentai@gmail.com',
    replyTo: email.trim(),
    subject: `New chatbot booking from ${name.trim()}`,
    html: `
      <div style="font-family: sans-serif; max-width: 560px; color: #1a1a1a;">
        <h2 style="margin: 0 0 8px; font-size: 20px;">New consultation booking via chatbot</h2>
        <p style="margin: 0 0 24px; color: #6b7280; font-size: 14px;">Submitted through the Invisigent AI assistant</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; width: 120px; vertical-align: top;">Name</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${name.trim()}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; vertical-align: top;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${email.trim()}">${email.trim()}</a></td>
          </tr>
          ${phone?.trim() ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; vertical-align: top;">Phone</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${phone.trim()}</td>
          </tr>` : ''}
          ${company?.trim() ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; vertical-align: top;">Company</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${company.trim()}</td>
          </tr>` : ''}
          ${brief?.trim() ? `
          <tr>
            <td style="padding: 10px 0; font-weight: 600; vertical-align: top;">Brief</td>
            <td style="padding: 10px 0; white-space: pre-wrap;">${brief.trim()}</td>
          </tr>` : ''}
        </table>
        <p style="margin: 32px 0 0; font-size: 12px; color: #9ca3af;">
          Sent via Invisigent AI chatbot · Reply directly to respond to ${name.trim()}
        </p>
      </div>
    `,
  });
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  message: string;
  history: ChatMessage[];
}

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json() as ChatRequest;

    if (!message?.trim()) {
      return NextResponse.json({ reply: 'Please enter a message.' }, { status: 400 });
    }

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      // include prior conversation (exclude the initial assistant greeting to save tokens)
      ...history.slice(-10).map(m => ({ role: m.role, content: m.content })),
      { role: 'user', content: message.trim() },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      tools: [bookingTool],
      tool_choice: 'auto',
      max_tokens: 300,
      temperature: 0.5,
    });

    const choice = completion.choices[0];

    // LLM called the booking tool — send email and confirm
    if (choice.finish_reason === 'tool_calls' && choice.message.tool_calls?.length) {
      const toolCall = choice.message.tool_calls[0] as { function: { arguments: string } };
      const fields = JSON.parse(toolCall.function.arguments) as {
        name: string; email: string; phone?: string; company?: string; brief?: string;
      };

      try {
        await sendBookingEmail(fields);
        return NextResponse.json({
          reply: `You're all set, ${fields.name.split(' ')[0]}! Your consultation request has been received. The Invisigent team will reach out to ${fields.email} within 24 hours. Looking forward to hearing more about your project.`,
          booked: true,
        });
      } catch (emailErr) {
        console.error('[chat/route] email send failed', emailErr);
        return NextResponse.json({
          reply: "I've noted your details but had trouble sending the confirmation. Please reach out directly via our contact page — we'll get back to you within 24 hours.",
          booked: false,
        });
      }
    }

    const reply = choice.message.content ?? "I couldn't generate a response. Please try again.";
    return NextResponse.json({ reply, booked: false });
  } catch (err) {
    console.error('[chat/route]', err);
    return NextResponse.json(
      { reply: 'Something went wrong. Please try again or reach us via the contact page.' },
      { status: 200 }
    );
  }
}
