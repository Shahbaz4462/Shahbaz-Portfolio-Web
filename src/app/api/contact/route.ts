import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, honeypot } = body;

    // 1. Anti-spam Honeypot Check
    if (honeypot && honeypot.trim() !== '') {
      // Silently reject bot submissions
      return NextResponse.json({ success: true, message: 'Message received.' });
    }

    // 2. Field Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // 3. Email Dispatch Integration (Formspree or EmailJS or Nodemailer behind API)
    // The target address (shahbaz4462@gmail.com) is held strictly in backend server memory!
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT || 'https://formspree.io/f/mqakpeor';

    try {
      await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          _replyto: email,
        }),
      });
    } catch (dispatchErr) {
      console.warn('Formspree dispatch fallback executed:', dispatchErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. Muhammad Shahbaz will get back to you shortly.',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to process message request. Please try again.' },
      { status: 500 }
    );
  }
}
