type Network = "mainnet" | "testnet";

export async function trackBitcoinTx(
  txHash: string,
  network: Network
) {
  const baseUrl =
    network === "mainnet"
      ? "https://blockstream.info/api"
      : "https://blockstream.info/testnet/api";

  const txRes = await fetch(`${baseUrl}/tx/${txHash}`);
  if (!txRes.ok) {
    throw new Error("Transaction not found");
  }

  const tx = await txRes.json();

  let status = "pending";
  let confirmations = 0;

  if (tx.status?.confirmed) {
    const tipRes = await fetch(`${baseUrl}/blocks/tip/height`);
    const tipHeight = Number(await tipRes.text());
    confirmations = tipHeight - tx.status.block_height + 1;
    status = "confirmed";
  }

  return {
    txHash,
    network,
    status,
    confirmations,
    blockHeight: tx.status?.block_height ?? null,
    explorerUrl:
      network === "mainnet"
        ? `https://blockstream.info/tx/${txHash}`
        : `https://blockstream.info/testnet/tx/${txHash}`,
    timestamp: Date.now()
  };
}
