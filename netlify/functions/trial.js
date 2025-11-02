import crypto from "crypto";
import { kv } from "@netlify/kv";

export default async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { deviceId } = JSON.parse(req.body || "{}");
    if (!deviceId) {
      return res.status(400).json({ error: "Missing deviceId" });
    }

    // Check if this device already used a trial
    const existing = await kv.get(deviceId);
    if (existing) {
      return res.status(403).json({ error: "Trial already used" });
    }

    const now = Math.floor(Date.now() / 1000);
    const expiresAt = now + 24 * 60 * 60; // 24-hour validity
    const trialId = crypto.randomUUID();

    const payload = `${deviceId}.${trialId}.${expiresAt}`;
    const signature = crypto
      .createHmac("sha256", process.env.TRIAL_SECRET)
      .update(payload)
      .digest("hex");

    // Store device record permanently
    await kv.set(deviceId, JSON.stringify({ trialId, issuedAt: now }), {
      expirationTtl: 60 * 60 * 24 * 365 * 5 // 5 years (or adjust)
    });

    return res.status(200).json({
      trialId,
      expiresAt,
      signature
    });
  } catch (err) {
    console.error("Trial error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
