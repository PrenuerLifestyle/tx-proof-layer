import { rateLimit } from "../../src/bitcoin/rateLimit";
const hits = new Map<string, { count: number; time: number }>();

export function rateLimit(ip: string, limit = 30, windowMs = 60_000) {
  const now = Date.now();
  const record = hits.get(ip);

  if (!record || now - record.time > windowMs) {
    hits.set(ip, { count: 1, time: now });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}
