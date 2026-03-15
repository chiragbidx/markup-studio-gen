import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/sendgrid";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { firstName, lastName, email, subject, message } = data;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !subject ||
      !message
    ) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const body = `
      <div style="font-family: Inter, Arial, sans-serif; font-size: 16px">
        <h3>Mailvibe website inquiry</h3>
        <p><strong>From:</strong> ${firstName} ${lastName} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space: pre-wrap; background: #f6f8fa; padding: 12px; border-radius: 8px; font-size: 16px">${message}</pre>
      </div>
    `;
    await sendEmail(
      "hi@chirag.co",
      `Contact Inquiry: ${subject}`,
      body
    );
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to send contact form. Please try again." },
      { status: 500 }
    );
  }
}