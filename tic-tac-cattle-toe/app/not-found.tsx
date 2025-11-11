import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Tic-Tac-Cattle-Toe",
  description:
    "The page you're looking for doesn't exist. Return to Tic-Tac-Cattle-Toe and enjoy game.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      <p>How about playing a game of Tic-Tac-Cattle-Toe instead?</p>
      <Link
        href='/'
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#2563eb",
          color: "white",
          textDecoration: "none",
          borderRadius: "0.375rem",
        }}
      >
        Return to Game
      </Link>
    </div>
  );
}
