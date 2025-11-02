import crypto from "crypto";

export default async (req, context) => {
  const url = new URL(req.url);
  const kv = context.env?.TRIAL_DEVICES;

  if (!kv) {
    console.error("❌ KV binding missing — check netlify.toml and dashboard namespace setup");
    return new Response(JSON.stringify({ error: "Server misconfigured: missing KV binding" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const adminKey = process.env.TRIAL_ADMIN_KEY;
  const hmacSecret = process.env.TRIAL_SECRET ?? "CHANGE_ME_SECRET";

  // --- Handle Admin Actions ---
  const action = url.searchParams.get("action");
  const providedAdminKey = url.searchParams.get("adminKey");
  const deviceId = url.searchParams.get("deviceId");

  if (providedAdminKey && providedAdminKey === adminKey) {
    if (!action)
      return new Response(JSON.stringify({ error: "Missing action" }), { status: 400 });

    switch (action) {
      case "reset": {
        if (!deviceId)
          return new Response(JSON.stringify({ error: "Missing deviceId" }), { status: 400 });
        await kv.delete(deviceId);
        return new Response(JSON.stringify({ success: true, message: `Reset ${deviceId}` }), {
          headers: { "Content-Type": "application/json" },
        });
      }
      case "get": {
        if (!deviceId)
          return new Response(JSON.stringify({ error: "Missing deviceId" }), { status: 400 });
        const data = await kv.get(deviceId, { type: "json" });
        return new Response(JSON.stringify(data || { error: "Not found" }), {
          headers: { "Content-Type": "application/json" },
        });
      }
      default:
        return new Response(JSON.stringify({ error: "Unknown admin action" }), { status: 400 });
    }
  }

  // --- Normal User Flow ---
  let body = {};
  try {
    if (req.method === "POST") body = await req.json().catch(() => ({}));
  } catch {
    body = {};
  }

  const id = body.deviceId || deviceId;
  if (!id)
    return new Response(JSON.stringify({ error: "Missing deviceId" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });

  // Check existing record
  const existing = await kv.get(id, { type: "json" });
  if (existing) {
    return new Response(JSON.stringify({ error: "Trial already used", record: existing }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Issue new trial (24 hours)
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
  const token = crypto.createHmac("sha256", hmacSecret).update(`${id}.${expiresAt}`).digest("hex");
  const trialData = { deviceId: id, expiresAt, token };

  await kv.put(id, JSON.stringify(trialData));

  return new Response(JSON.stringify(trialData), {
    headers: { "Content-Type": "application/json" },
  });
};
