import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, honeypot } = body;

    // 1. Anti-spam Honeypot Check
    if (honeypot && honeypot.trim() !== '') {
      return NextResponse.json({ success: true, message: 'Message sent successfully!' });
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

    const recipientEmail = process.env.RECIPIENT_EMAIL || 'shahbaz04462@gmail.com';
    const resendApiKey = process.env.RESEND_API_KEY;
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT || 'https://formspree.io/f/mqakpeor';

    let isSent = false;

    // Option A: Resend API (if RESEND_API_KEY env var is present)
    if (resendApiKey) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.SENDER_EMAIL || 'Portfolio Contact <onboarding@resend.dev>',
            to: [recipientEmail],
            reply_to: email,
            subject: `[Portfolio Contact] ${subject}`,
            html: `
              <h2>New Message from Portfolio Website</h2>
              <p><strong>From:</strong> ${name} (&lt;${email}&gt;)</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <hr />
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            `,
          }),
        });

        if (resendRes.ok) {
          isSent = true;
        } else {
          const errData = await resendRes.json();
          console.error('Resend API error:', errData);
        }
      } catch (resendErr) {
        console.error('Resend dispatch error:', resendErr);
      }
    }

    // Option B: Formspree API (fallback or primary if FORMSPREE_ENDPOINT is configured)
    if (!isSent && formspreeEndpoint) {
      try {
        const formspreeRes = await fetch(formspreeEndpoint, {
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
            _to: recipientEmail,
          }),
        });

        if (formspreeRes.ok) {
          isSent = true;
        } else {
          console.error('Formspree dispatch error:', await formspreeRes.text());
        }
      } catch (fsErr) {
        console.error('Formspree fetch error:', fsErr);
      }
    }

    if (isSent) {
      return NextResponse.json({
        success: true,
        message: 'Message sent successfully!',
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Unable to send your message. Please try again.' },
        { status: 500 }
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'Unable to send your message. Please try again.' },
      { status: 500 }
    );
  }
}
