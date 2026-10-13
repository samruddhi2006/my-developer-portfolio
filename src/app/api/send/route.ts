import { EmailTemplate } from "@/components/email-template";
import { config } from "@/data/config";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

const Email = z.object({
  fullName: z.string().min(2, "Full name is invalid!"),
  email: z.string().email({ message: "Email is invalid!" }),
  message: z.string().min(10, "Message is too short!"),
});
export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return Response.json(
        { error: "Email service is not configured yet. Please email me directly instead." },
        { status: 500 }
      );
    }

    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    if (isRateLimited(ip)) {
      return Response.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const body = await req.json();
    const {
      success: zodSuccess,
      data: zodData,
      error: zodError,
    } = Email.safeParse(body);
    if (!zodSuccess)
      return Response.json({ error: zodError?.message }, { status: 400 });

    // NOTE: Resend's shared onboarding@resend.dev sender only delivers to
    // the Resend account's own email address. To receive mail at any other
    // address, verify a custom domain and set RESEND_FROM to it, e.g.
    // "Portfolio <contact@yourdomain.com>".
    const { data: resendData, error: resendError } = await resend.emails.send({
      from: process.env.RESEND_FROM || "Portfolio <onboarding@resend.dev>",
      to: [config.email],
      subject: "Contact me from portfolio",
      react: EmailTemplate({
        fullName: zodData.fullName,
        email: zodData.email,
        message: zodData.message,
      }) as React.ReactElement,
    });

    if (resendError) {
      console.error("[contact] resend error:", resendError.message);
      return Response.json(
        { error: `Email failed to send (${resendError.message}). Please email me directly instead.` },
        { status: 500 }
      );
    }

    return Response.json(resendData);
  } catch (error) {
    console.error("[contact] unexpected error:", error);
    return Response.json(
      { error: "Something went wrong sending your message. Please email me directly instead." },
      { status: 500 }
    );
  }
}
