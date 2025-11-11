export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://tictaccattletoe.vercel.app//#webapp",
        name: "Tic-Tac-Cattle-Toe",
        description:
          "A tic-tac-toe game, real-time weather integration, and educational Scotland trivia",
        url: "https://tictaccattletoe.vercel.app",
        applicationCategory: "GameApplication",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "127",
          bestRating: "5",
          worstRating: "1",
        },
        author: {
          "@type": "Person",
          name: "Galiano19",
        },
        genre: ["Strategy Game", "Educational Game"],
        keywords:
          "tic-tac-toe, weather integration, Scotland facts, online game",
        softwareVersion: "1.0",
        datePublished: "2024-01-01",
        dateModified: "2025-11-11",
        inLanguage: "en-US",
        isAccessibleForFree: true,
      },
      {
        "@type": "Game",
        "@id": "https://tictaccattletoe.vercel.app/#game",
        name: "Tic-Tac-Cattle-Toe",
        description: "Tic-tac-toe game with weather features",
        gameItem: {
          "@type": "Thing",
          name: "Digital Board Game",
        },
        numberOfPlayers: {
          "@type": "QuantitativeValue",
          minValue: 1,
          maxValue: 1,
        },
        playMode: ["SinglePlayer"],
        gamePlatform: ["Web Browser", "Desktop", "Mobile"],
        genre: ["Strategy", "Educational"],
        audience: {
          "@type": "Audience",
          suggestedMinAge: 6,
          suggestedMaxAge: 99,
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://tictaccattletoe.vercel.app/#website",
        name: "Tic Tac Cattle Toe",
        url: "https://tictaccattletoe.vercel.app",
        description:
          "Tic-tac-toe game with weather integration and Scotland trivia",
        publisher: {
          "@type": "Person",
          name: "Galiano19",
        },
        potentialAction: [
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate:
                "https://tictaccattletoe.vercel.app/?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        ],
        sameAs: ["https://github.com/Galiano19/tictaccattletoe"],
      },
    ],
  };

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
