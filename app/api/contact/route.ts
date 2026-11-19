import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      name?: unknown;
      email?: unknown;
      subject?: unknown;
      message?: unknown;
    };

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (name.length < 2 || name.length > 120) {
      return NextResponse.json(
        { error: 'Please enter your name (2–120 characters).' },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email) || email.length > 200) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (subject.length < 2 || subject.length > 160) {
      return NextResponse.json(
        { error: 'Please enter a subject (2–160 characters).' },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Please enter a message between 10 and 5000 characters.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey === 'MY_RESEND_API_KEY') {
      return NextResponse.json(
        {
          error:
            'Email delivery is not active yet because RESEND_API_KEY has not been configured on the server.',
        },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const toEmail = process.env.CONTACT_TO_EMAIL || 'Mytypingtestdotnet@gmail.com';
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || 'TypingMeter Contact <onboarding@resend.dev>';

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `[TypingMeter Contact] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #0f172a; max-width: 600px;">
          <h2 style="margin: 0 0 16px; font-size: 18px;">New Contact Submission</h2>
          <p style="margin: 0 0 8px;"><strong>Name:</strong> ${safeName}</p>
          <p style="margin: 0 0 8px;"><strong>Email:</strong> ${safeEmail}</p>
          <p style="margin: 0 0 16px;"><strong>Subject:</strong> ${safeSubject}</p>
          <div style="padding: 16px; border: 1px solid #e2e8f0; border-radius: 8px; background: #f8fafc;">
            ${safeMessage}
          </div>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message || 'Unable to send email via Resend.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id ?? null });
  } catch {
    return NextResponse.json(
      { error: 'Unable to process your request right now. Please try again.' },
      { status: 500 }
    );
  }
}
