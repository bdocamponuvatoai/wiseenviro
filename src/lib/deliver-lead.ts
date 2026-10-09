import "server-only";

type LeadKind = "service-request" | "job-interest";

/**
 * Sends a form submission to LEAD_WEBHOOK_URL as JSON (works with Zapier, Make, n8n,
 * a CRM inbound webhook, or an email service's HTTP endpoint).
 * Returns false when delivery is not configured in production, so the user is told to call instead
 * of losing the lead silently.
 */
export async function deliverLead(kind: LeadKind, data: Record<string, unknown>): Promise<boolean> {
  const url = process.env.LEAD_WEBHOOK_URL;

  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.info(
        `[deliverLead] LEAD_WEBHOOK_URL not set; ${kind} accepted in development only`,
        data,
      );
      return true;
    }
    console.error("[deliverLead] LEAD_WEBHOOK_URL is not configured");
    return false;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_WEBHOOK_SECRET
          ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify({ kind, submittedAt: new Date().toISOString(), data }),
      signal: AbortSignal.timeout(8_000),
      cache: "no-store",
    });
    if (!response.ok) console.error(`[deliverLead] webhook responded ${response.status}`);
    return response.ok;
  } catch (error) {
    console.error("[deliverLead] webhook request failed", error);
    return false;
  }
}
