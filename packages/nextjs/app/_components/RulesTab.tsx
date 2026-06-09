"use client";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="card bg-base-200 shadow-md">
    <div className="card-body p-5">
      <h3 className="card-title text-lg">{title}</h3>
      <div className="text-base-content/80 text-sm space-y-1">{children}</div>
    </div>
  </div>
);

export const RulesTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Section title="🎮 How to Play">
        <p>
          There are 25 clams, each hiding a secret CLAWD value. First, pick the clam you want to hold for the whole
          game. Then play through 8 rounds of eliminations, opening other clams to reveal what they were hiding.
        </p>
        <p>After each round the banker makes you an offer. Take the deal, or keep playing.</p>
      </Section>

      <Section title="🏦 Banker Offer">
        <p>
          The banker&apos;s offer is always slightly below the expected value of the clams still in play. Early offers
          are stingy and grow more generous as the field narrows.
        </p>
        <p>Round multipliers climb from roughly 55% up to 97% of expected value.</p>
      </Section>

      <Section title="🏠 House Edge">
        <p>The average payout lands around 80–90% of the entry fee. Of every entry fee:</p>
        <ul className="list-disc list-inside">
          <li>96% goes to the prize pool</li>
          <li>2% is burned</li>
          <li>2% goes to the treasury</li>
        </ul>
      </Section>

      <Section title="💰 Jackpot">
        <p>
          The jackpot scales with the pool TVL, so deeper pools mean bigger top prizes. The jackpot is always at least
          5x the entry fee.
        </p>
      </Section>

      <Section title="📈 Invest">
        <p>
          Deposit CLAWD into the pool to receive shares. The pool backs every jackpot, and as the house edge accumulates
          over many games, the value of each share grows.
        </p>
        <p>Withdraw any time the pool is not locked by an active game.</p>
      </Section>

      <Section title="⏱️ Forfeit Rule">
        <p>
          If a contestant goes inactive for 24 hours, anyone can forfeit their game. This unlocks the pool so the next
          player can start.
        </p>
      </Section>

      <Section title="🔍 Transparency">
        <p>
          Clam values are committed on-chain via Chainlink VRF and become visible after the shuffle. There is no ZK
          hiding — everything is disclosed and verifiable on Base.
        </p>
      </Section>

      <Section title="🌊 Pool Seeding">
        <p>
          Before the very first game can start, someone must deposit CLAWD to seed the pool. Head to the Invest tab to
          add liquidity.
        </p>
      </Section>
    </div>
  );
};
