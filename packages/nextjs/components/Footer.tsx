import { SwitchTheme } from "~~/components/SwitchTheme";

const POOL_ADDRESS = "0x94a312581269433d52F83c8FFd34097370627E2a";
const GAME_ADDRESS = "0x5E91944DB001C70435E2425DF14430829d4fBc06";

/**
 * Site footer
 */
export const Footer = () => {
  return (
    <div className="min-h-0 py-5 px-4 mt-auto">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-sm text-base-content/80">
        <span className="text-center">25 Clams — CLAWD Deal or No Deal on Base</span>
        <span className="hidden sm:inline">·</span>
        <a
          href={`https://basescan.org/address/${POOL_ADDRESS}`}
          target="_blank"
          rel="noreferrer"
          className="link link-hover"
        >
          ClamsPool
        </a>
        <span className="hidden sm:inline">·</span>
        <a
          href={`https://basescan.org/address/${GAME_ADDRESS}`}
          target="_blank"
          rel="noreferrer"
          className="link link-hover"
        >
          ClamsGame
        </a>
      </div>
      <div className="flex justify-center mt-2">
        <SwitchTheme />
      </div>
    </div>
  );
};
