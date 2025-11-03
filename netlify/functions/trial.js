import { Client } from "pg";
import crypto from "crypto";

async function getDb() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();

  // Create table if it doesn't exist
  await client.query(`
    CREATE TABLE IF NOT EXISTS trials (
      device_id TEXT PRIMARY KEY,
      expires_at BIGINT NOT NULL,
      token TEXT NOT NULL
    );
  `);

  return client;
}

export default async (req) => {
  const url = new URL(req.url);
  const adminKey = process.env.TRIAL_ADMIN_KEY;
  const secret = process.env.TRIAL_SECRET ?? "CHANGE_ME_SECRET";
  const deviceId = url.searchParams.get("deviceId");

  const client = await getDb();

  // --- Admin actions ---
  const action = url.searchParams.get("action");
  const providedKey = url.searchParams.get("adminKey");
  if (providedKey && providedKey === adminKey) {
    if (action === "reset" && deviceId) {
      await client.query("DELETE FROM trials WHERE device_id = $1", [deviceId]);
      await client.end();
      return new Response(
        JSON.stringify({ success: true, message: `Trial reset for ${deviceId}` }),
        { headers: { "Content-Type": "application/json" } }
      );
    } else if (action === "get" && deviceId) {
      const res = await client.query("SELECT * FROM trials WHERE device_id = $1", [deviceId]);
      await client.end();
      return new Response(JSON.stringify(res.rows[0] || { error: "Not found" }), {
        headers: { "Content-Type": "application/json" },
      });
    } else {
      await client.end();
      return new Response(JSON.stringify({ error: "Invalid admin action" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // --- User flow ---
  let body = {};
  try {
    if (req.method === "POST") body = await req.json().catch(() => ({}));
  } catch {
    body = {};
  }

  const id = body.deviceId || deviceId;
  if (!id) {
    await client.end();
    return new Response(JSON.stringify({ error: "Missing deviceId" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // --- Check existing record ---
  const existing = await client.query("SELECT * FROM trials WHERE device_id = $1", [id]);
  if (existing.rows.length > 0) {
    await client.end();
    return new Response(
      JSON.stringify({ error: "Trial redeemed, Upgrade to AirSync+", record: existing.rows[0] }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  // --- Issue new trial ---
  const expiresAt = Date.now() + 48 * 60 * 60 * 1000; // 48 hours
  // const expiresAt = Date.now() + 60 * 5000; // 5 mins for testing
  const token = crypto.createHmac("sha256", secret).update(`${id}.${expiresAt}`).digest("hex");
  const trialData = { device_id: id, expires_at: expiresAt, token };

  await client.query(
    "INSERT INTO trials (device_id, expires_at, token) VALUES ($1, $2, $3)",
    [trialData.device_id, trialData.expires_at, trialData.token]
  );

  await client.end();

  return new Response(JSON.stringify(trialData), {
    headers: { "Content-Type": "application/json" },
  });
};
