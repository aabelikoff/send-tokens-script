import "dotenv/config";
import { ethers } from "ethers";

async function main() {
  try {
    const amount = process.argv[2];

    const { RPC_URL, RECIPIENT_ADDRESS, SENDER_PRIVATE_KEY } = process.env;

    if (!RPC_URL) throw new Error("RPC_URL is missing in .env");
    if (!SENDER_PRIVATE_KEY) throw new Error("SENDER_PRIVATE_KEY is missing in .env");
    if (!RECIPIENT_ADDRESS) throw new Error("RECIPIENT_ADDRESS is missing in .env");
    if (!amount) throw new Error("AMOUNT is missing (pass it like: node sendToken.js 0.01)");

    if (typeof amount !== "string" || !amount.match(/^\d+(\.\d+)?$/)) {
      throw new Error(`Invalid amount "${amount}". Use a decimal string, e.g. "0.01"`);
    }

    const provider = new ethers.JsonRpcProvider(RPC_URL);

    if (!ethers.isAddress(RECIPIENT_ADDRESS)) {
      throw new Error(`Invalid RECIPIENT_ADDRESS: ${RECIPIENT_ADDRESS}`);
    }

    const wallet = new ethers.Wallet(SENDER_PRIVATE_KEY, provider);

      console.log("Sending native tokens");
    console.log("From:", wallet.address);
    console.log("To  :", RECIPIENT_ADDRESS);
    console.log("Amount :", amount);

    const parsedAmount = ethers.parseEther(amount);

    const balanceOnStart = await provider.getBalance(wallet.address);
    if (balanceOnStart < parsedAmount) {
      throw new Error(
        `💰 Insufficient balance. You have ${ethers.formatEther(
          balanceOnStart
        )}, trying to send ${amount}`
      );
    }

    console.log("⌛ Sending transaction...");

    const txResponse = await wallet.sendTransaction({
      to: RECIPIENT_ADDRESS,
      value: parsedAmount,
    });

    console.log("✅ TX submitted!");
    console.log("🔗 TX hash:", txResponse.hash);

    const receipt = await txResponse.wait();
    console.log(receipt);

    if (receipt.status === 1) {
      console.log(`✅ Success! Included in block ${receipt.blockNumber.toString()}`);
    } else {
      console.log("❌ Transaction reverted on-chain");
    }
  } catch (err) {
    console.error("⛔Error while sending transaction.");
    console.error(err?.message || err);
    process.exit(1);
  }
}

main();
