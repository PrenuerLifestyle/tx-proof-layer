import type { NextApiRequest, NextApiResponse } from "next";
import { trackBitcoinTx } from "../../../src/bitcoin/trackBitcoinTx";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { txHash, network = "mainnet" } = req.query;

  if (typeof txHash !== "string") {
    return res.status(400).json({ error: "txHash query parameter required" });
  }

  try {
    const proof = await trackBitcoinTx(txHash, network as string);
    return res.status(200).json(proof);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch tx proof" });
  }
}
