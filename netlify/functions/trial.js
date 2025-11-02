import crypto from "crypto";

/**
 * Netlify KV is globally available — no import needed.
 * This function issues a 24-hour trial token per deviceId.
 */
export default async (req, context) => {
  const { deviceId } = await req.json();

  if (!deviceId) {
    return new Response(JSON.stringify({ error: "Missing deviceId" }), { status: 400 });
  }

  const kv = context.env?.TRIAL_DEVICES ?? globalThis.NETLIFY?.env?.TRIAL_DEVICES;
  const existing = await kv?.get(deviceId, { type: "json" });

  // If already exists, return the same token
  if (existing) {
    return new Response(JSON.stringify(existing), { headers: { "Content-Type": "application/json" } });
  }

  // Otherwise, issue a new one
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
  const secret = process.env.TRIAL_SECRET ?? "CHANGE_ME_SECRET";
  const token = crypto
    .createHmac("sha256", secret)
    .update(`${deviceId}.${expiresAt}`)
    .digest("hex");

  const trialData = { deviceId, expiresAt, token };

  await kv?.put(deviceId, JSON.stringify(trialData));

  return new Response(JSON.stringify(trialData), {
    headers: { "Content-Type": "application/json" },
  });
};
