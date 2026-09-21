<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=Google%20Search%20MCP%20Server&fontSize=42&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Web%20Search%20for%20AI%20Agents%20via%20MCP&descAlignY=58&descSize=18" width="100%"/>

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![MCP](https://img.shields.io/badge/Protocol-MCP-8A2BE2?style=for-the-badge&logo=protocolsdotio&logoColor=white)](https://modelcontextprotocol.io/) [![Google Custom Search](https://img.shields.io/badge/Google-Custom%20Search%20API-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://programmablesearchengine.google.com/) [![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<br/>

[![Listed on mcpservers.org](https://mcpservers.org/badge.svg)](https://mcpservers.org/servers/hasinduudara/google-search-mcp.git)


### 🔍 An MCP server that lets any MCP-compatible AI client search the live web through Google's Custom Search JSON API — over stdio, plug-and-play.

</div>

---

## 🧭 Table of Contents

- [🧭 Table of Contents](#-table-of-contents)
- [✨ Overview](#-overview)
- [⚙️ Requirements](#️-requirements)
- [🔧 Google Custom Search Setup](#-google-custom-search-setup)
- [⚠️ Rate Limits \& Quota](#️-rate-limits--quota)
- [📦 Installation](#-installation)
- [▶️ Run](#️-run)
- [🐳 Run with Docker](#-run-with-docker)
  - [Point your MCP client to Docker](#point-your-mcp-client-to-docker)
- [🔌 MCP Client Configuration](#-mcp-client-configuration)
- [🧩 Using This Server in Your Own Project](#-using-this-server-in-your-own-project)
- [🛠️ Available Tool](#️-available-tool)
  - [`search_google`](#search_google)
- [🧪 Test with MCP Inspector](#-test-with-mcp-inspector)
- [📁 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
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

## ⚠️ Rate Limits & Quota

The Google Custom Search JSON API's **free tier allows 100 queries per day**. Once that limit is hit, the API returns a `429` error and `search_google` will respond with an error message instead of results.

- Need more? You can enable billing on your Google Cloud project for up to 10,000 queries/day (paid, per-query pricing).
- Check your current usage in the [Google Cloud Console](https://console.cloud.google.com/) under **APIs & Services → Custom Search API → Quotas**.

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

## 🐳 Run with Docker

Prefer containers? You can build and run this server without installing Node.js locally.

**Build the image:**

```bash
docker build -t google-search-mcp .
```

**Run it** (make sure your `.env` file is set up first — see [Installation](#-installation)):

```bash
docker run -i --rm --env-file .env google-search-mcp
```

> ⚠️ The `-i` flag is required — this is a stdio-based MCP server and needs an interactive stream to communicate with the client.

**Or use Docker Compose:**

```yaml
services:
  google-search-mcp:
    build: .
    stdin_open: true
    tty: true
    env_file:
      - .env
```

```bash
docker compose up --build
```

### Point your MCP client to Docker

```json
{
  "mcpServers": {
    "google-search": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "--env-file", ".env", "google-search-mcp"]
    }
  }
}
```

## 🔌 MCP Client Configuration

After building the project, register the server with an MCP-compatible client using the compiled entry point:

```json
{
  "mcpServers": {
    "google-search": {
      "command": "node",
      "args": ["/absolute/path/to/Google-Search-MCP/build/index.js"],
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
      "args": ["/absolute/path/to/Google-Search-MCP/build/index.js"]
    }
  }
}
```

---

## 🧩 Using This Server in Your Own Project

This server isn't tied to any single client — any MCP-compatible host can spawn it and call `search_google`. To use it elsewhere:

1. **Clone and build** this repo (or pull the Docker image — see [Run with Docker](#-run-with-docker)).
2. **Point your MCP client's config** at the built entry point (`build/index.js`) or the Docker command, using the same JSON shown in [MCP Client Configuration](#-mcp-client-configuration).
3. **Supported clients** — any tool that speaks MCP over stdio works, including:
   - Claude Desktop
   - [Cursor](https://www.cursor.com/) (`.cursor/mcp.json`)
   - [Cline](https://github.com/cline/cline) (VS Code extension settings)
   - Custom agents built with the [MCP SDK](https://modelcontextprotocol.io/) directly
4. **Calling it programmatically** — if you're building your own MCP client/agent in code, connect an MCP `Client` over `StdioClientTransport` pointed at `build/index.js`, then call the `search_google` tool like any other MCP tool. See the [MCP TypeScript SDK docs](https://modelcontextprotocol.io/) for client-side examples.

> Each client has its own config file location and format for `mcpServers` — check that client's docs for exactly where to paste the JSON block.

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

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome!

- **Found a bug or have an idea?** [Open an issue](../../issues) describing it.
- **Want to contribute code?**
  1. Fork the repo
  2. Create a branch (`git checkout -b feature/your-feature`)
  3. Make your changes and test locally (`npm start` or `docker compose up --build`)
  4. Commit and push, then open a Pull Request

Please keep PRs focused — one feature or fix per PR makes review easier.

---

## 📄 License

 This project is licensed under the [MIT License](LICENSE).

---

<br/>

[![Listed on mcpservers.org](https://mcpservers.org/badge.svg)](https://mcpservers.org/servers/hasinduudara/google-search-mcp.git)


## 👤 Author

<div align="center">

**M. Hasindu Udara**
Full-Stack Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hasindu-udara)

</div>

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer" width="100%"/>
