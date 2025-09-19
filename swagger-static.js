/**
 * Swagger UI Server
 * Simple HTTP server for API documentation with auto port detection
 */

require("dotenv").config();
const http = require("http");

class SwaggerServer {
  constructor(startPort = 3000) {
    this.startPort = startPort;
    this.port = null;
  }

  async findAvailablePort() {
    const startPort = this.startPort;
    const maxPort = startPort + 1;

    for (let port = startPort; port <= maxPort; port++) {
      try {
        const isAvailable = await this.isPortAvailable(port);
        if (isAvailable) {
          return port;
        }
      } catch (error) {
        // Continue to next port
        continue;
      }
    }

    throw new Error(
      `No available ports found between ${startPort} and ${maxPort}`
    );
  }

  async isPortAvailable(port) {
    return new Promise((resolve) => {
      const server = http.createServer();

      server.listen(port, () => {
        server.close(() => resolve(true));
      });

      server.on("error", () => {
        resolve(false);
      });
    });
  }

  async start() {
    try {
      // Find an available port automatically
      this.port = await this.findAvailablePort();

      const server = http.createServer((req, res) => {
        this.handleRequest(req, res);
      });

      server.listen(this.port, () => {
        console.log(
          `Swagger UI Server running at http://localhost:${this.port}`
        );
        console.log(`Swagger UI: http://localhost:${this.port}/api-docs`);
        console.log(`Home: http://localhost:${this.port}/`);
      });

      return server;
    } catch (error) {
      console.error("Failed to start server:", error.message);
      process.exit(1);
    }
  }

  handleRequest(req, res) {
    const url = new URL(req.url, `http://localhost:${this.port}`);
    const pathname = url.pathname;

    // CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.writeHead(200);
      res.end();
      return;
    }

    switch (pathname) {
      case "/":
        this.serveHomePage(res);
        break;
      case "/api-docs":
        this.serveSwaggerUI(res);
        break;
      case "/swagger.yaml":
        this.serveSwaggerYAML(res);
        break;
      case "/api/run-challenge":
        this.serveRunChallenge(res);
        break;
      default:
        this.serve404(res);
    }
  }

  serveHomePage(res) {
    const html = `
<!DOCTYPE html>
<html>
<head>
    <title>ADP Challenge - API Documentation</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .btn { display: inline-block; background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px; }
        .btn:hover { background: #0056b3; }
        .info { background: #e7f3ff; padding: 15px; border-radius: 5px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>ADP Innovation Labs Challenge</h1>
            <p>Transaction Analysis API Documentation</p>
        </div>
        
        <div class="info">
            <h3>Challenge Overview</h3>
            <p>This application demonstrates transaction analysis by:</p>
            <ul>
                <li>Fetching transaction data from ADP API</li>
                <li>Finding the top earner from previous year</li>
                <li>Filtering alpha transactions</li>
                <li>Submitting results back to ADP API</li>
            </ul>
        </div>
        
        <div style="text-align: center;">
            <a href="/api-docs" class="btn">View Swagger UI</a>
        </div>
        
        <div class="info">
            <h3>Quick Start</h3>
            <p><strong>Run the challenge:</strong></p>
            <code>npm start</code>
            <p><strong>Run tests:</strong></p>
            <code>npm test</code>
        </div>
    </div>
</body>
</html>`;

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  }

  serveSwaggerUI(res) {
    const swaggerHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>ADP Challenge API Documentation</title>
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui.css" />
    <style>
        html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
        *, *:before, *:after { box-sizing: inherit; }
        body { margin:0; background: #fafafa; }
        
        /* Hide search bar */
        .swagger-ui .topbar { display: none !important; }
        .swagger-ui .topbar-wrapper { display: none !important; }
        .swagger-ui .topbar .download-url-wrapper { display: none !important; }
        
        /* Custom styling */
        .swagger-ui .info { margin: 20px 0; }
        .swagger-ui .info .title { font-size: 2.5rem; }
        .swagger-ui .scheme-container { background: #f7f7f7; padding: 15px; border-radius: 5px; }
    </style>
</head>
<body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-bundle.js"></script>
    <script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-standalone-preset.js"></script>
    <script>
        window.onload = function() {
            const ui = SwaggerUIBundle({
                url: '/swagger.yaml',
                dom_id: '#swagger-ui',
                presets: [
                    SwaggerUIBundle.presets.apis,
                    SwaggerUIStandalonePreset
                ],
                layout: "StandaloneLayout",
                deepLinking: true,
                showExtensions: true,
                showCommonExtensions: true,
                docExpansion: "list",
                defaultModelsExpandDepth: 1,
                defaultModelExpandDepth: 1,
                displayRequestDuration: true,
                tryItOutEnabled: true,
                requestInterceptor: function(request) {
                    return request;
                },
                responseInterceptor: function(response) {
                    return response;
                }
            });
        };
    </script>
</body>
</html>`;

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(swaggerHTML);
  }

  serveSwaggerYAML(res) {
    const yamlContent = `openapi: 3.0.0
info:
  title: ADP Innovation Labs Challenge API
  description: Transaction Analysis API for ADP Challenge
  version: 1.0.0
  contact:
    name: ADP Challenge Solution
    email: challenge@adp.com
servers:
  - url: http://localhost:${this.port}
    description: Development server
paths:
  /api/run-challenge:
    get:
      summary: Execute ADP Challenge
      description: Runs the complete ADP challenge workflow
      tags:
        - Challenge
      responses:
        '200':
          description: Challenge completed successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  taskId:
                    type: string
                    example: "c70354e6-9a4c-48fc-8d65-fef0b44fb753"
                  topEarner:
                    type: object
                    properties:
                      name:
                        type: string
                        example: "Abram Choi"
                      id:
                        type: string
                        example: "SED133"
                      totalEarnings:
                        type: number
                        example: 407627
                  alphaTransactionIds:
                    type: array
                    items:
                      type: string
                    example: ["TX_016", "TX_022", "TX_047"]
                  apiResponse:
                    type: string
                    example: "Correct"
        '500':
          description: Internal server error
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    example: "Challenge failed"
                  message:
                    type: string
                    example: "Error details"
components:
  schemas:
    Transaction:
      type: object
      properties:
        transactionID:
          type: string
          example: "TX_016"
        timeStamp:
          type: string
          format: date-time
          example: "2024-05-25T17:35:19.460Z"
        amount:
          type: number
          example: 1000
        type:
          type: string
          example: "alpha"
        location:
          type: object
          properties:
            name:
              type: string
              example: "New York, NY"
            id:
              type: string
              example: "L001"
        employee:
          type: object
          properties:
            name:
              type: string
              example: "Abram Choi"
            id:
              type: string
              example: "SED133"
            categoryCode:
              type: string
              example: "red"
tags:
  - name: Challenge
    description: ADP Challenge operations`;

    res.writeHead(200, { "Content-Type": "application/x-yaml" });
    res.end(yamlContent);
  }

  async serveRunChallenge(res) {
    try {
      // Import the main challenge logic
      const { ADPChallenge } = require("./index");

      // Create instance and execute the challenge
      const challenge = new ADPChallenge();
      const result = await challenge.runChallenge();

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result, null, 2));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify(
          {
            error: "Challenge failed",
            message: error.message,
          },
          null,
          2
        )
      );
    }
  }

  serve404(res) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }, null, 2));
  }
}

// Start server if this file is executed directly
if (require.main === module) {
  const server = new SwaggerServer();
  server.start();
}

module.exports = SwaggerServer;
