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

    const resendApiKey = process.env.RESEND_API_KEY;
    const web3formsKey = process.env.WEB3FORMS_KEY;
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;
    const recipientEmail = process.env.RECIPIENT_EMAIL || 'shahbaz04462@gmail.com';

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

    // Option D: FormSubmit using the ACTIVATED hash key (avoids re-triggering activation emails)
    // Hash key obtained from the FormSubmit activation email for mshahbaz.me
    if (!isSent) {
      try {
        const formsubmitHash =
          process.env.FORMSUBMIT_HASH || '58a709ed51e76ded572319d4c6ffbf96';
        const targetUrl = `https://formsubmit.co/ajax/${formsubmitHash}`;

        const fsRes = await fetch(targetUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            subject: `[Portfolio Contact] ${subject}`,
            message,
            _replyto: email,
            _captcha: 'false',
            _template: 'table',
          }),
        });

        const fsData = await fsRes.json().catch(() => ({}));
        if (fsRes.ok && fsData?.success !== 'false' && fsData?.success !== false) {
          isSent = true;
        } else {
          console.error('FormSubmit error response:', fsData);
        }
      } catch (err) {
        console.error('FormSubmit dispatch error:', err);
      }
    }

    if (!isSent) {
      return NextResponse.json(
        { success: false, error: 'Failed to send message. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
    });
  } catch (err: any) {
    console.error('Contact API unexpected error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to process message request. Please try again.' },
      { status: 500 }
    );
  }
}
