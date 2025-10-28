# send-token

A simple **CLI script** built with **Node.js** and **ethers.js** that sends native tokens (ETH, MATIC, BNB, etc.) from one wallet to another.

The script:

- Sends a transaction using a private key
- Prints the transaction hash to the console
- Handles errors (invalid address, insufficient funds, RPC issues)

---

## 🔧 Requirements

- Node.js 20+
- RPC endpoint (Infura, Alchemy, or a public RPC node)
- Wallet with some balance (test or real tokens)
- npm

---

## ⚙️ Environment Setup

1. Install dependencies:
   `npm install `

2. Create your .env file based on .env.example:
   `cp .env.example .env`

3. Fill out your .env:

```
RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
SENDER_PRIVATE_KEY=0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
RECIPIENT_ADDRESS=0xBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
```

## ▶️ Run the Script

- amount - the amount to send (in full network tokens, not wei) (eg: 1, 0.003 ....)

```
npm run send -- amount

## example
npm run send -- 0.00001
```

## 📂 Project Structure

```text
send-token/
├─ package.json
├─ sendToken.js
├─ .env.example
└─ README.md
```
