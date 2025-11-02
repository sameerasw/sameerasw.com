export default async (req, context) => {
  const url = new URL(req.url);
  const action = url.searchParams.get("action");
  const deviceId = url.searchParams.get("deviceId");
  const key = url.searchParams.get("key");

  const adminKey = process.env.TRIAL_ADMIN_KEY;
  const kv = context.env?.TRIAL_DEVICES ?? globalThis.NETLIFY?.env?.TRIAL_DEVICES;

  if (key !== adminKey) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!action) {
    return new Response(JSON.stringify({ error: "Missing action" }), { status: 400 });
  }

  switch (action) {
    case "reset":
      if (!deviceId) return new Response(JSON.stringify({ error: "Missing deviceId" }), { status: 400 });
      await kv.delete(deviceId);
      return new Response(JSON.stringify({ success: true, message: `Trial reset for ${deviceId}` }), {
        headers: { "Content-Type": "application/json" },
      });

    case "get":
      if (!deviceId) return new Response(JSON.stringify({ error: "Missing deviceId" }), { status: 400 });
      const data = await kv.get(deviceId, { type: "json" });
      return new Response(JSON.stringify(data || { error: "Not found" }), {
        headers: { "Content-Type": "application/json" },
      });

    default:
      return new Response(JSON.stringify({ error: "Unknown action" }), { status: 400 });
  }
};
