export type BitcoinNetwork = "mainnet" | "testnet";

export interface TxProof {
  txHash: string;
  network: BitcoinNetwork;
  status: "pending" | "confirmed" | "failed";
  confirmations: number;
  explorerUrl: string;
  timestamp: number;
}
