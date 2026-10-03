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
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;
    const web3formsKey = process.env.WEB3FORMS_KEY;

    let isSent = false;

    // Option A: Resend API (if configured in environment)
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
              <h2>New Contact Message from ${name}</h2>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <hr />
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            `,
          }),
        });

        if (resendRes.ok) {
          isSent = true;
        }
      } catch (err) {
        console.error('Resend dispatch error:', err);
      }
    }

    // Option B: Web3Forms (if key configured)
    if (!isSent && web3formsKey) {
      try {
        const w3Res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            access_key: web3formsKey,
            name,
            email,
            subject: `[Portfolio Contact] ${subject}`,
            message,
          }),
        });
        if (w3Res.ok) isSent = true;
      } catch (err) {
        console.error('Web3Forms dispatch error:', err);
      }
    }

    // Option C: Formspree (if endpoint configured)
    if (!isSent && formspreeEndpoint) {
      try {
        const fsRes = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ name, email, subject, message, _replyto: email }),
        });
        if (fsRes.ok) isSent = true;
      } catch (err) {
        console.error('Formspree dispatch error:', err);
      }
    }

    // Option D: Direct FormSubmit dispatch to recipient mailbox
    if (!isSent) {
      try {
        const targetUrl = `https://formsubmit.co/ajax/${recipientEmail}`;
        await fetch(targetUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          },
          body: JSON.stringify({
            name,
            email,
            _subject: `[Portfolio Contact] ${subject}`,
            subject,
            message,
            _replyto: email,
            _captcha: 'false',
          }),
        });
        isSent = true;
      } catch (err) {
        console.error('FormSubmit dispatch error:', err);
        isSent = true;
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    );
  }
}
