import axios from "axios";
import { TxProof } from "../proof/TxProof";
import { getExplorerUrl } from "../network/bitcoinNetwork";

export async function trackBitcoinTx(
  txHash: string,
  network: "mainnet" | "testnet"
): Promise<TxProof> {

  const base =
    network === "testnet"
      ? "https://blockstream.info/testnet/api"
      : "https://blockstream.info/api";

  const tx = await axios.get(`${base}/tx/${txHash}`);
  const status = await axios.get(`${base}/tx/${txHash}/status`);

  return {
    txHash,
    network,
    status: status.data.confirmed ? "confirmed" : "pending",
    confirmations: status.data.confirmed ? status.data.confirmations : 0,
    explorerUrl: getExplorerUrl(txHash, network),
    timestamp: Date.now()
  };
}
