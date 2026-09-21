<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=Google%20Search%20MCP%20Server&fontSize=42&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Web%20Search%20for%20AI%20Agents%20via%20MCP&descAlignY=58&descSize=18" width="100%"/>

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MCP](https://img.shields.io/badge/Protocol-MCP-8A2BE2?style=for-the-badge&logo=protocolsdotio&logoColor=white)](https://modelcontextprotocol.io/)
[![Google Custom Search](https://img.shields.io/badge/Google-Custom%20Search%20API-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://programmablesearchengine.google.com/)
[![License](https://img.shields.io/badge/License-Unspecified-lightgrey?style=for-the-badge)]()

<br/>

[![Listed on mcpservers.org](https://mcpservers.org/badge.svg)](https://mcpservers.org/servers/hasinduudara/google-search-mcp.git)

<br/>

### 🔍 An MCP server that lets any MCP-compatible AI client search the live web through Google's Custom Search JSON API — over stdio, plug-and-play.

</div>

---

## 🧭 Table of Contents

- [🧭 Table of Contents](#-table-of-contents)
- [✨ Overview](#-overview)
- [⚙️ Requirements](#️-requirements)
- [🔧 Google Custom Search Setup](#-google-custom-search-setup)
- [📦 Installation](#-installation)
- [▶️ Run](#️-run)
- [🔌 MCP Client Configuration](#-mcp-client-configuration)
- [🛠️ Available Tool](#️-available-tool)
  - [`search_google`](#search_google)
- [🧪 Test with MCP Inspector](#-test-with-mcp-inspector)
- [📁 Project Structure](#-project-structure)
- [📄 License](#-license)
- [👤 Author](#-author)

---

## ✨ Overview

> This server bridges the gap between **AI agents** and **real-time web knowledge**.
> It speaks the **Model Context Protocol (MCP)** over stdio, so any compatible client can call a single tool — `search_google` — and get back clean, structured search results straight from Google.

```
┌─────────────────┐        stdio (MCP)        ┌──────────────────────┐        HTTPS        ┌───────────────────┐
│   MCP Client     │ ───────────────────────▶ │  Google Search MCP    │ ──────────────────▶ │  Google Custom     │
│ (Claude, etc.)   │ ◀─────────────────────── │       Server           │ ◀────────────────── │  Search JSON API   │
└─────────────────┘        results            └──────────────────────┘       results        └───────────────────┘
```

---

## ⚙️ Requirements

| Requirement | Details |
|---|---|
| 🟢 **Node.js** | v18 or newer |
| 🔑 **Google API Key** | With access to the Custom Search JSON API |
| 🆔 **Search Engine ID** | From a Google Programmable Search Engine (`cx`) |

---

## 🔧 Google Custom Search Setup

1. **Create a project** in the [Google Cloud Console](https://console.cloud.google.com/)
2. **Enable** the `Custom Search API` for that project
3. **Generate** an API key
4. **Create** a [Programmable Search Engine](https://programmablesearchengine.google.com/) and copy its **Search Engine ID**

---

## 📦 Installation

```bash
npm install
```

Create a `.env` file in the project root:

```env
GOOGLE_API_KEY=your_google_api_key
SEARCH_ENGINE_ID=your_search_engine_id
```

> ⚠️ **Never commit `.env`** or expose your API key in source control.

---

## ▶️ Run

**Development** (run TypeScript directly):

```bash
npm start
```

**Production** (build then run compiled output):

```bash
npm run build
node build/index.js
```

> ℹ️ The server logs status and errors to `stderr`, keeping `stdout` clean for MCP protocol messages.

---

## 🔌 MCP Client Configuration

After building the project, register the server with an MCP-compatible client using the compiled entry point:

```json
{
  "mcpServers": {
    "google-search": {
      "command": "node",
      "args": ["D:/My Learning Projects/Google-Search-MCP/build/index.js"],
      "env": {
        "GOOGLE_API_KEY": "your_google_api_key",
        "SEARCH_ENGINE_ID": "your_search_engine_id"
      }
    }
  }
}
```

Or keep credentials in the project's `.env` and launch from the project directory:

```json
{
  "mcpServers": {
    "google-search": {
      "command": "node",
      "args": ["D:/My Learning Projects/Google-Search-MCP/build/index.js"]
    }
  }
}
```

---

## 🛠️ Available Tool

### `search_google`

Searches Google Custom Search for the supplied query and returns the **top 3 results**.

**Input**

```json
{
  "query": "latest TypeScript release"
}
```

**Output**

Each result includes:
- 📌 `title`
- 🔗 `link`
- 📝 `snippet`

If nothing is found, the tool responds with `No results found.`

---

## 🧪 Test with MCP Inspector

```bash
npm run build
npx @modelcontextprotocol/inspector node build/index.js
```

> Make sure your environment variables are set before launching the inspector.

---

## 📁 Project Structure

```text
📦 Google-Search-MCP
├── 📂 src
│   └── index.ts     # MCP server implementation
├── 📂 build          # Compiled JavaScript and type declarations
├── .env              # Local environment config (not committed)
└── README.md
```

---

## 📄 License

No license has been specified for this project yet.

---

<br/>

[![Listed on mcpservers.org](https://mcpservers.org/badge.svg)](https://mcpservers.org/servers/hasinduudara/google-search-mcp.git)

<br/>

## 👤 Author

<div align="center">

**M. Hasindu Udara**
Full-Stack Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hasindu-udara)

</div>

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer" width="100%"/>
