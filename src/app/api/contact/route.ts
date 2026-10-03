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

    const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL || 'https://mshahbaz.me';
    const resendApiKey = process.env.RESEND_API_KEY;
    const web3formsKey = process.env.WEB3FORMS_KEY;
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;

    // FormSubmit AJAX endpoint uses the REAL email address (not the hash).
    // The hash is only for the HTML <form action=""> attribute.
    // The form is already activated so FormSubmit will deliver without sending
    // another activation email.
    const formsubmitEmail =
      process.env.FORMSUBMIT_EMAIL || 'shahbaz04462@gmail.com';

    let isSent = false;

    // Option A: Resend API (if configured in environment)
    if (!isSent && resendApiKey) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.SENDER_EMAIL || 'Portfolio Contact <onboarding@resend.dev>',
            to: [formsubmitEmail],
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
          console.log('Email sent via Resend');
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
        const w3Data = await w3Res.json().catch(() => ({}));
        if (w3Res.ok && w3Data?.success) {
          isSent = true;
          console.log('Email sent via Web3Forms');
        }
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
        if (fsRes.ok) {
          isSent = true;
          console.log('Email sent via Formspree');
        }
      } catch (err) {
        console.error('Formspree dispatch error:', err);
      }
    }

    // Option D: FormSubmit AJAX — must use real email address, not the hash.
    // Spoof Origin/Referer to match the activated domain so FormSubmit accepts the request.
    if (!isSent) {
      try {
        const targetUrl = `https://formsubmit.co/ajax/${formsubmitEmail}`;

        const fsRes = await fetch(targetUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': siteOrigin,
            'Referer': `${siteOrigin}/`,
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

        const fsText = await fsRes.text();
        console.log('FormSubmit response status:', fsRes.status, 'body:', fsText);

        let fsData: any = {};
        try { fsData = JSON.parse(fsText); } catch { /* non-JSON response */ }

        // FormSubmit returns {"success":"true"} (string, not boolean) on success
        if (fsRes.ok && (fsData?.success === 'true' || fsData?.success === true)) {
          isSent = true;
          console.log('Email sent via FormSubmit');
        } else {
          console.error('FormSubmit failed:', fsRes.status, fsData);
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
