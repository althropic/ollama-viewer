# Ollama Dashboard

A modern web-based dashboard for visualizing and managing Ollama AI models with a clean, intuitive interface.

## Overview

Ollama Dashboard provides a user-friendly alternative to managing models through terminal JSON output. It fetches the latest models from the Ollama API and displays them with size-based color coding, search/filter capabilities, and a polished dark theme interface.

### Key Features

- **📊 Size-Based Color Coding**: Models are categorized by size with intuitive color tags
  - 🟢 Small (<7B): Green
  - 🔵 Medium (7-13B): Blue
  - 🟠 Large (14-70B): Amber
  - 🔴 Heavy (>70B): Red

- **🔍 Search & Filter**: Real-time search by model name with size category filters

- **📅 Sort by Creation Date**: Models sorted by creation date (newest first)

- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

- **🎨 Dark Theme**: Professional dark UI with Tailwind CSS

- **⚡ Auto-Refreshing**: SWR integration for automatic data updates

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: SWR
- **Testing**: Vitest
- **API**: Ollama OpenAI-compatible API (proxied via Next.js API route)

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── models/
│   │       └── route.ts      # API proxy route (server-side)
│   ├── layout.tsx            # Root layout with SWR provider
│   ├── page.tsx              # Main dashboard page
│   ├── providers.tsx         # SWR configuration
│   └── globals.css           # Tailwind imports
├── components/
│   ├── Header.tsx            # Dashboard header with stats
│   ├── ModelCard.tsx         # Individual model display
│   ├── ModelList.tsx         # Grid layout with filters
│   └── SearchBar.tsx         # Search input component
├── hooks/
│   └── useModels.ts          # SWR hook for fetching models
├── lib/
│   ├── api.ts                # API client (calls local proxy)
│   ├── api.test.ts           # API client tests
│   ├── types.ts              # TypeScript interfaces
│   ├── size.ts               # Size categorization logic
│   ├── size.test.ts          # Size utility tests
│   └── lastUsed.ts           # Last used tracking utilities
└── __tests__/                # Additional tests
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/chocolatepcode/ollama-viewer.git
cd ollama-viewer
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run unit tests with Vitest
- `npm run lint` - Run ESLint

## Architecture

The dashboard uses a **proxy pattern** to avoid CORS issues:

1. **Browser** → **Next.js API Route** (`/api/models`)
2. **Next.js API Route** → **Ollama.com API** (server-side, no CORS)
3. **Next.js API Route** → **Browser** (same origin, no CORS)

This approach:
- Avoids CORS errors by making external API calls server-side
- Keeps the dashboard fetching up-to-date models from ollama.com
- Allows for future enhancements like caching or request modification

## API Integration

The dashboard fetches models from the Ollama API:

```
GET https://ollama.com/v1/models
```

Response format (OpenAI-compatible):
```json
{
  "object": "list",
  "data": [
    {
      "id": "qwen3-coder:7b",
      "object": "model",
      "created": 1704067200,
      "owned_by": "ollama"
    }
  ]
}
```

## Size Categorization

Models are categorized based on their size in billions of parameters:

| Category | Size Range | Color |
|----------|------------|-------|
| Small | < 7B | 🟢 Green |
| Medium | 7B - 13B | 🔵 Blue |
| Large | 14B - 70B | 🟠 Amber |
| Heavy | > 70B | 🔴 Red |

Size is extracted from model names using patterns like `qwen3-coder:7b` or `llama3:70b`.

## Testing

Run the test suite:

```bash
npm test
```

Tests cover:
- API client functionality
- Size categorization logic
- Error handling

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [Ollama](https://ollama.com) - For providing the AI model API
- [Next.js](https://nextjs.org) - For the React framework
- [Tailwind CSS](https://tailwindcss.com) - For the styling system
- [SWR](https://swr.vercel.app) - For data fetching
