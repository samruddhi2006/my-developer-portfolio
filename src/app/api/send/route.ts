import { z } from "zod";

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

// Apps Script cold starts can take a few seconds; bound the wait so a hung
// upstream can't hold a serverless function past the platform timeout.
const UPSTREAM_TIMEOUT_MS = 12000;

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

const ContactSubmission = z.object({
  fullName: z
    .string()
    .min(2, "Full name is invalid!")
    .max(100, "Full name is too long!"),
  email: z
    .string()
    .email({ message: "Email is invalid!" })
    .max(254, "Email is too long!"),
  message: z
    .string()
    .min(10, "Message is too short!")
    .max(5000, "Message is too long!"),
  // Honeypot — real users leave it blank, bots tend to fill it.
  website: z.string().max(200).optional().default(""),
});

export async function POST(req: Request) {
  try {
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (!scriptUrl) {
      return Response.json(
        {
          error:
            "Message service is not configured yet. Please email me directly instead.",
        },
        { status: 500 }
      );
    }

    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    if (isRateLimited(ip)) {
      return Response.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return Response.json(
        { error: "Invalid request. Please try again." },
        { status: 400 }
      );
    }

    const {
      success: zodSuccess,
      data: zodData,
      error: zodError,
    } = ContactSubmission.safeParse(body);
    if (!zodSuccess)
      return Response.json({ error: zodError?.message }, { status: 400 });

    // Fake success for honeypot fills so bots can't probe the endpoint.
    if (zodData.website) {
      return Response.json({ ok: true });
    }

    // Server-to-server POST: no CORS preflight, redirects followed, and the
    // Apps Script deployment URL never reaches the browser.
    let upstream: Response;
    try {
      upstream = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: zodData.fullName,
          email: zodData.email,
          message: zodData.message,
        }),
        redirect: "follow",
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      });
    } catch (fetchError) {
      console.error("[contact] sheets upstream unreachable:", fetchError);
      return Response.json(
        {
          error:
            "Couldn't save your message right now. Please email me directly instead.",
        },
        { status: 502 }
      );
    }

    let result: { ok?: boolean } | null = null;
    try {
      result = (await upstream.json()) as { ok?: boolean };
    } catch {
      result = null;
    }

    // Apps Script always answers HTTP 200 — only its `ok` field confirms
    // the row was written. Anything else is a failed submission.
    if (!upstream.ok || !result || result.ok !== true) {
      console.error("[contact] sheets rejected submission");
      return Response.json(
        {
          error:
            "Couldn't save your message right now. Please email me directly instead.",
        },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("[contact] unexpected error:", error);
    return Response.json(
      {
        error:
          "Something went wrong sending your message. Please email me directly instead.",
      },
      { status: 500 }
    );
  }
}
