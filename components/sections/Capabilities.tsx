import { FadeUp } from "@/components/motion/FadeUp";

const capabilities = [
  "Ethereum / EVM",
  "L2 Scaling",
  "Smart Contracts",
  "DeFi Protocols",
  "Payment Systems",
  "Security Audits",
  "Tokenomics",
  "Solidity",
  "ZK Proofs",
  "OP Stack",
  "Arbitrum Orbit",
  "Wallet Infrastructure",
  "On-chain Identity",
  "Cross-chain Bridges",
  "Stablecoins",
  "Regulatory Compliance",
];

export function Capabilities() {
  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp className="mb-12">
          <p className="label-mono mb-4">Capabilities</p>
          <h2 className="text-h2 text-[#0A0A0A] max-w-md">
            The full technical stack.
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="flex flex-wrap gap-2">
            {capabilities.map((cap) => (
              <span
                key={cap}
                className="font-mono text-xs text-[#52525B] border border-[#E4E4E7] bg-[#F4F4F5] px-3 py-2 hover:border-[#1D4ED8] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] transition-colors duration-150 cursor-default"
              >
                {cap}
              </span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
