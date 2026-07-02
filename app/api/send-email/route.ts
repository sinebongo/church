import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function getTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'elcsa.cdpyl@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD, // Use an App Password, not your main Gmail password
    },
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { type } = body;

  // Admin replying to a message from the dashboard
  if (type === 'reply') {
    const { to, subject, text } = body;
    if (!process.env.GMAIL_APP_PASSWORD) {
      return NextResponse.json(
        { success: false, error: 'Email sending is not configured yet.' },
        { status: 503 }
      );
    }
    try {
      await getTransporter().sendMail({ from: 'elcsa.cdpyl@gmail.com', to, subject, text });
      return NextResponse.json({ success: true });
    } catch (error) {
      const err = error as Error;
      return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
  }

  // Visitor-submitted contact form or newsletter signup
  const { name, email, message } = body;

  const { error: dbError } = await supabase
    .from('contact_messages')
    .insert([{ type, name, email, message }]);

  if (dbError) {
    return NextResponse.json({ success: false, error: dbError.message }, { status: 500 });
  }

  // The message is safely captured in the admin dashboard regardless of email
  // delivery, so a missing/failing notification email isn't a fatal error here.
  if (process.env.GMAIL_APP_PASSWORD) {
    const subject = type === 'newsletter' ? 'Newsletter Subscription' : 'Contact Us Message';
    const text = type === 'newsletter'
      ? `New newsletter subscription: ${email}`
      : `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    try {
      await getTransporter().sendMail({ from: 'elcsa.cdpyl@gmail.com', to: 'elcsa.cdpyl@gmail.com', subject, text });
    } catch {
      // Notification email failed, but the message is already saved.
    }
  }

  return NextResponse.json({ success: true });
}
