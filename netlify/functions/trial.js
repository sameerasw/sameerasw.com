import crypto from "crypto";

export default async (req, context) => {
  const url = new URL(req.url);
  const kv = context.env?.TRIAL_DEVICES;

  // --- Ensure KV binding exists ---
  if (!kv) {
    console.error("❌ KV binding missing — check netlify.toml and ensure namespace 'trial-devices' is linked.");
    return new Response(
      JSON.stringify({ error: "Server misconfigured: missing KV binding" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
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
        console.log(`✅ Reset trial for ${deviceId}`);
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

  // --- Normal Trial Request ---
  let body = {};
  if (req.method === "POST") {
    try {
      body = await req.json();
    } catch {
      body = {};
    }
  }

  const id = body.deviceId || deviceId;
  if (!id) {
    return new Response(JSON.stringify({ error: "Missing deviceId" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // --- Check for existing trial ---
  const existing = await kv.get(id, { type: "json" });
  if (existing) {
    // If expired, reset automatically
    if (existing.expiresAt && Date.now() > existing.expiresAt) {
      await kv.delete(id);
      console.log(`⏳ Expired trial removed for ${id}`);
    } else {
      return new Response(JSON.stringify({ error: "Trial already used", record: existing }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // --- Create new trial ---
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24h
  const token = crypto.createHmac("sha256", hmacSecret)
    .update(`${id}.${expiresAt}`)
    .digest("hex");

  const trialData = { deviceId: id, expiresAt, token };
  await kv.put(id, JSON.stringify(trialData));

  console.log(`🎟️ Created new trial for ${id}`);
  return new Response(JSON.stringify(trialData), {
    headers: { "Content-Type": "application/json" },
  });
};
