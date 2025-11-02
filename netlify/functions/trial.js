import crypto from "crypto";

const getKV = (context) => {
  // Try a few possible places where Netlify may expose the KV binding
  // 1) context.env.TRIAL_DEVICES (preferred)
  // 2) globalThis.TRIAL_DEVICES
  // 3) globalThis.NETLIFY?.env?.TRIAL_DEVICES (older / alternate)
  return (context?.env && context.env.TRIAL_DEVICES) ??
         globalThis?.TRIAL_DEVICES ??
         globalThis?.NETLIFY?.env?.TRIAL_DEVICES;
};

export default async (req, context) => {
  let deviceId;

  // accept GET ?deviceId=... or POST { deviceId: "..." }
  try {
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

  const kv = getKV(context);
  if (!kv) {
    console.error("KV binding not found - ensure TRIAL_DEVICES KV namespace is configured in netlify.toml");
    return new Response(JSON.stringify({ error: "Server configuration error" }), { status: 500 });
  }

  // --- Check existing record ---
  // Use kv.get without assuming it returns parsed JSON, and treat any non-null value as "exists".
  let existingRaw;
  try {
    // try getting JSON parsed value first; fallback to raw string if that fails
    existingRaw = await kv.get(deviceId, { type: "json" });
    if (existingRaw === null) {
      // as fallback, try plain get (some runtimes return string)
      existingRaw = await kv.get(deviceId);
    }
  } catch (err) {
    console.warn("KV get returned error, trying fallback:", err);
    existingRaw = await kv.get(deviceId).catch(() => null);
  }

  if (existingRaw !== null && existingRaw !== undefined) {
  const record = typeof existingRaw === "string"
    ? (() => { try { return JSON.parse(existingRaw); } catch { return null; } })()
    : existingRaw;

  // if record exists but not expired, reject
  if (record && record.expiresAt && Date.now() < record.expiresAt) {
    return new Response(JSON.stringify({ error: "Trial already active", record }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  // otherwise, expired — delete old record and issue a new one
  await kv.delete(deviceId);
}


  // --- Issue new trial ---
  // 24-hour trial (ms); for testing you can reduce this
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  // NOTE: use TRIAL_SECRET (as you named it)
  const secret = process.env.TRIAL_SECRET ?? "CHANGE_ME_SECRET";
  const token = crypto.createHmac("sha256", secret).update(`${deviceId}.${expiresAt}`).digest("hex");

  const trialData = { deviceId, expiresAt, token };

  // store as JSON string
  await kv.put(deviceId, JSON.stringify(trialData));

  return new Response(JSON.stringify(trialData), {
    headers: { "Content-Type": "application/json" },
  });
};
