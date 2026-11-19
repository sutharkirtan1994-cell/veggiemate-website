/**
 * node --env-file=.env.local scripts/verify-resend-domain.mjs [domain_id]
 *
 * Triggers Resend's DNS verification check for a domain you've already
 * added in the Resend dashboard. This does NOT create DNS records — it only
 * checks whether the records Resend asked for are already live on your
 * domain's DNS. Add those first (Resend dashboard -> Domains -> the domain
 * -> the list of TXT/MX/CNAME records -> your domain registrar's DNS page),
 * then run this.
 *
 * The API key is read from process.env, populated by Node's --env-file flag
 * reading .env.local directly — it is never printed, logged, or returned by
 * this script. Only the verification result is.
 */

const apiKey = process.env.RESEND_API_KEY;
const domainId = process.argv[2] || "d91cd9bd-1176-453e-8fc1-35364d380206";

if (!apiKey) {
  console.error(
    "RESEND_API_KEY is not set. Put your real key in .env.local " +
      "(copy .env.local.example if you haven't), then run this again with:\n" +
      "  node --env-file=.env.local scripts/verify-resend-domain.mjs",
  );
  process.exit(1);
}

const res = await fetch(`https://api.resend.com/domains/${domainId}/verify`, {
  method: "POST",
  headers: { Authorization: `Bearer ${apiKey}` },
});

const body = await res.json().catch(() => null);

if (!res.ok) {
  console.error(`Resend returned ${res.status}:`, body?.message ?? body);
  process.exit(1);
}

console.log("Verification triggered. Resend's response:");
console.log(JSON.stringify(body, null, 2));
console.log(
  "\nIf this still shows records as 'pending' or 'not_started', the DNS " +
    "records haven't propagated yet (or haven't been added) — check the " +
    "Domains page in the Resend dashboard for the exact records needed.",
);
