console.log("🔥 test-proof.ts started");

import { trackBitcoinTx } from "./src";

(async () => {
  console.log("⏳ tracking tx...");
  
  const proof = await trackBitcoinTx(
    "fded58bfa800dc85c33eb36fae4bc16bd4d6425cc54b28c6c90b0958bb044188",
    "mainnet"
  );

  console.log("✅ PROOF RESULT:");
  console.log(JSON.stringify(proof, null, 2));
})();
