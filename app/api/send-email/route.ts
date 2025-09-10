import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { name, email, message, type } = await req.json();

  // Set up transporter using Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'elcsa.cdpyl@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD, // Use an App Password, not your main Gmail password
    },
  });

  let subject = type === 'newsletter' ? 'Newsletter Subscription' : 'Contact Us Message';
  let text = type === 'newsletter'
    ? `New newsletter subscription: ${email}`
    : `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

  try {
    await transporter.sendMail({
      from: 'elcsa.cdpyl@gmail.com',
      to: 'elcsa.cdpyl@gmail.com',
      subject,
      text,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
