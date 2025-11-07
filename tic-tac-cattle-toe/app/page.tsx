"use client";

import styles from "./page.module.css";
import { GameStateProvider } from "./providers/GameStateProvider";
import GameArea from "./components/GameArea/GameArea";

function GameContent() {
  return (
    <div className={styles.page}>
      <GameArea />
    </div>
  );
}

export default function Home() {
  return (
    <GameStateProvider>
      <GameContent />
    </GameStateProvider>
  );
}
