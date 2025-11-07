"use client";

import styles from "./page.module.css";
import { GameStateProvider } from "./providers/GameStateProvider";
import GameArea from "./components/GameArea/GameArea";

function GameContent() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <GameArea />
      </main>
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
