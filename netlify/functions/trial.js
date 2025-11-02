import crypto from "crypto";

export default async (req, context) => {
  let deviceId;

  try {
    // Support both POST (with JSON body) and GET (?deviceId=...)
    if (req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      deviceId = body.deviceId;
    } else {
      const url = new URL(req.url);
      deviceId = url.searchParams.get("deviceId");
    }
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  if (!deviceId) {
    return new Response(JSON.stringify({ error: "Missing deviceId" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Access the KV namespace
  const kv = context.env?.TRIAL_DEVICES ?? globalThis.NETLIFY?.env?.TRIAL_DEVICES;
  const existing = await kv?.get(deviceId, { type: "json" });

  if (existing) {
    return new Response(JSON.stringify(existing), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
  const expiresAt = Date.now() + 60 * 1000; // 1 minute for testing

  const secret = process.env.HMAC_SECRET ?? "CHANGE_ME_SECRET";
  const token = crypto.createHmac("sha256", secret).update(`${deviceId}.${expiresAt}`).digest("hex");

  const trialData = { deviceId, expiresAt, token };
  await kv?.put(deviceId, JSON.stringify(trialData));

  return new Response(JSON.stringify(trialData), {
    headers: { "Content-Type": "application/json" },
  });
};
