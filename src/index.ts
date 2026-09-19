import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

// Check if the required API keys are available
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID;

if (!GOOGLE_API_KEY || !SEARCH_ENGINE_ID) {
  console.error("Error: GOOGLE_API_KEY and SEARCH_ENGINE_ID must be set in the .env file.");
  process.exit(1);
}

// Initialize the MCP server
const server = new Server(
  {
    name: "simple-web-fetcher-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools to the client
server.setRequestHandler(ListToolsRequestSchema, async function () {
  return {
    tools: [
      {
        name: "search_google",
        description: "Search the web using Google Custom Search API to find the latest information.",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "The search query to look for.",
            },
          },
          required: ["query"],
        },
      },
    ],
  };
});

// Handle tool execution requests
server.setRequestHandler(CallToolRequestSchema, async function (request) {
  if (request.params.name === "search_google") {
    const query = String(request.params.arguments?.query);
    
    try {
      // Construct the API URL for Google Custom Search
      const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`;
      
      // Fetch the search results from Google
      const response = await fetch(url);
      const data = await response.json();

      // Extract the top 3 results and format them
      const results = data.items?.slice(0, 3).map(function (item: any) {
        return `Title: ${item.title}\nLink: ${item.link}\nSnippet: ${item.snippet}\n`;
      }).join("\n") || "No results found.";

      return {
        content: [
          {
            type: "text",
            text: results,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error performing the search: ${error}`,
          },
        ],
      };
    }
  }

  throw new Error(`Tool not found: ${request.params.name}`);
});

// Start the server using standard input/output
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // Log message indicating the server has started
  console.error("Simple Web Fetcher MCP Server is running...");
}

main().catch(function (error) {
  console.error(error);
});