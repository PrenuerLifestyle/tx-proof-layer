export function getExplorerUrl(
  txHash: string,
  network: "mainnet" | "testnet"
): string {
  if (network === "testnet") {
    return `https://blockstream.info/testnet/tx/${txHash}`;
  }
  return `https://blockstream.info/tx/${txHash}`;
}
