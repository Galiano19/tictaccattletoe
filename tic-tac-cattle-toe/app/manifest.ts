import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tic Tac Cattle Toe - The Game and Weather",
    short_name: "TicTacCattleToe",
    description: "A tic-tac-toe game, weather features, and Scotland trivia",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#2563eb",
    orientation: "portrait",
    categories: ["games", "entertainment", "education"],
    lang: "en",
  };
}
