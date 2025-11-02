import { Client } from "pg";
import crypto from "crypto";

export default async (req, context) => {
  const url = new URL(req.url);
  const db = new Client({ connectionString: process.env.DATABASE_URL });

  await db.connect();

  const adminKey = process.env.TRIAL_ADMIN_KEY;
  const hmacSecret = process.env.TRIAL_SECRET ?? "CHANGE_ME_SECRET";

  // ensure table exists (auto-create)
  await db.query(`
    CREATE TABLE IF NOT EXISTS trials (
      device_id TEXT PRIMARY KEY,
      expires_at BIGINT NOT NULL,
      token TEXT NOT NULL
    );
  `);

  const action = url.searchParams.get("action");
  const providedAdminKey = url.searchParams.get("adminKey");
  const deviceId = url.searchParams.get("deviceId");

  // --- Admin actions ---
  if (providedAdminKey && providedAdminKey === adminKey) {
    switch (action) {
      case "reset":
        if (!deviceId)
          return json({ error: "Missing deviceId" }, 400);
        await db.query("DELETE FROM trials WHERE device_id = $1", [deviceId]);
        await db.end();
        return json({ success: true, message: `Reset ${deviceId}` });

      case "get":
        if (!deviceId)
          return json({ error: "Missing deviceId" }, 400);
        const result = await db.query("SELECT * FROM trials WHERE device_id = $1", [deviceId]);
        await db.end();
        return json(result.rows[0] || { error: "Not found" });

      case "list":
        const list = await db.query("SELECT * FROM trials ORDER BY expires_at DESC");
        await db.end();
        return json(list.rows);

      default:
        await db.end();
        return json({ error: "Unknown admin action" }, 400);
    }
  }

  // --- Normal trial request ---
  let body = {};
  try {
    if (req.method === "POST") {
      body = await req.json();
    }
  } catch {}

  const id = body.deviceId || deviceId;
  if (!id) {
    await db.end();
    return json({ error: "Missing deviceId" }, 400);
  }

  const existing = await db.query("SELECT * FROM trials WHERE device_id = $1", [id]);
  if (existing.rows.length > 0) {
    const trial = existing.rows[0];
    if (Date.now() < trial.expires_at) {
      await db.end();
      return json({ error: "Trial already used", record: trial }, 403);
    } else {
      // expired → delete and continue
      await db.query("DELETE FROM trials WHERE device_id = $1", [id]);
    }
  }

  // Issue new trial (24h)
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
  const token = crypto.createHmac("sha256", hmacSecret)
    .update(`${id}.${expiresAt}`)
    .digest("hex");

  await db.query("INSERT INTO trials (device_id, expires_at, token) VALUES ($1, $2, $3)", [id, expiresAt, token]);
  await db.end();

  return json({ deviceId: id, expiresAt, token });
};

// helper
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
