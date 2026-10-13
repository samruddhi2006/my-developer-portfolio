# Contact Form → Google Sheets Setup Guide

The contact form no longer sends email. Submissions flow:

```
Browser → POST /api/send (Next.js, validates + rate-limits)
        → POST Google Apps Script web app (validates + sanitises)
        → appends row to your Google Sheet
```

The Apps Script URL lives **only** in the server env var `GOOGLE_SCRIPT_URL`.
It is never exposed to the browser.

## 1. Create the spreadsheet

1. Go to [sheets.new](https://sheets.new) (signed in with the Google account
   that will own the submissions).
2. Rename the spreadsheet to something like `Portfolio Contact Submissions`.
3. Leave the first sheet as-is — the script creates the header row
   (`Timestamp | Name | Email | Message`) automatically on first write.
4. Optional: select column A → Format → Number → Date time, so timestamps
   display nicely.

## 2. Add the Apps Script

1. In the spreadsheet: **Extensions → Apps Script**.
2. Delete any placeholder code and paste the full contents of
   `google-apps-script/Code.gs` from this repo.
3. **Save** the project (Ctrl/Cmd+S), name it e.g. `Portfolio Contact Receiver`.
4. No libraries, triggers, or extra services are needed. The script only uses
   built-in services (`SpreadsheetApp`, `ContentService`, `LockService`).

## 3. Deploy as a web app

1. **Deploy → New deployment**.
2. Type: **Web app** (gear icon → Web app).
3. Settings (all three matter):
   - **Description**: e.g. `Contact form receiver v1`.
   - **Execute as**: **Me** (your account — the script writes to *your* sheet).
   - **Who has access**: **Anyone** (anonymous). This is required: the
     Next.js server calls the endpoint without a Google login. The URL
     itself stays secret on the server, and the API route rate-limits callers.
4. **Deploy** → authorize when prompted (see "Authorization" below) →
   **copy the Web app URL** ending in `/exec`.

> Updating the script later: **Deploy → Manage deployments → Edit** (new
> version) — the `/exec` URL stays the same, so no env changes are needed.
> Creating a *new* deployment instead issues a new URL you must copy again.

## 4. Authorization (first deploy only)

Google shows an "unverified app" warning because the script isn't verified:

1. Click **Advanced → Go to \<project name\> (unsafe)**.
2. Grant access to spreadsheets. This is normal for personal scripts —
   verification is only needed for public add-ons, not your own form backend.

## 5. Local environment

In `.env.local` (never committed):

```bash
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Restart `pnpm dev`, submit the test form, and confirm a row appears in the sheet.

## 6. Vercel environment

1. Vercel Dashboard → project → **Settings → Environment Variables**.
2. Add `GOOGLE_SCRIPT_URL` (Production + Preview; Preview lets you test
   pull-request deployments against the same sheet).
3. **Deployments → ⋯ → Redeploy** — env changes only apply to new builds.
4. Test the live form and check the sheet.

## 7. Testing checklist

- [ ] Open the `/exec` URL in a browser → expect `{"ok":true,"service":"contact-form"}`.
- [ ] Valid submission → success toast, fields clear, row appears with timestamp.
- [ ] Bad email / short message → inline field error, no request sent.
- [ ] 4 rapid submits → 4th rejected with "Too many requests" (3/min/IP).
- [ ] Value starting with `=1+1` → stored as plain text (leading `'`), not a formula.
- [ ] Empty `GOOGLE_SCRIPT_URL` → friendly "not configured" error, no crash.

## 8. Troubleshooting

| Symptom | Cause / fix |
|---|---|
| Form shows "not configured" | `GOOGLE_SCRIPT_URL` missing — set it locally / in Vercel and restart/redeploy. |
| "Couldn't save your message" (502) | Upstream unreachable or script returned `{ok:false}`. Check Vercel function logs, then Apps Script **Executions** page for the real error. |
| Browser shows script login page | Deployment access isn't **Anyone** — redeploy with anonymous access. |
| CORS / redirect errors (only if calling from browser) | Not applicable here: only the server calls Apps Script, which follows its 302 redirect. Keep it that way. |
| `busy` rejections | Script lock contention under burst traffic — rare; user just retries. |
| Quota errors | Consumer Apps Script quotas apply (URL Fetch calls, script runtime). For a portfolio form this is plenty; sustained abuse would show as `unavailable` and is throttled by the API rate limit first. |
| Test rows in the sheet | Delete them manually; the header row is only auto-created when the sheet is empty. |
| Changed sheet tab | The script writes to the spreadsheet's **active/first** sheet. Keep submissions on the first tab or adjust the code to `getSheetByName(...)`. |

## 9. Abuse risks (residual)

- The `/exec` URL accepts anonymous POSTs by design. Mitigations in place:
  server-side rate limiting (3/min/IP), Zod length/format validation on both
  ends, honeypot field with fake-success, formula-injection sanitising,
  write serialisation via script lock, and no internal details in responses.
- Remaining: a determined attacker with the URL could still write rows within
  rate limits (spam, not data theft — the endpoint is write-only and reveals
  nothing). If abused, redeploy the script (new URL), update the env var, and
  redeploy. Consider reCAPTCHA only if this ever becomes a real problem.
