import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { createServer } from "http";

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware for Logging
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Register API routes
registerRoutes(app);

// Error Handling Middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(`❌ Error: ${status} - ${message}`);
  res.status(status).json({ message });
});

// ✅ Set port dynamically for dev/prod (default: 65444)
const PORT = process.env.PORT || 65444;
const isDev = app.get("env") === "development";

// ✅ Setup Vite in development mode
(async () => {
  if (isDev) {
    console.log("🚀 Running in Development Mode (with Vite)");
    await setupVite(app, server);
  } else {
    console.log("⚡ Running in Production Mode (Serving Static Files)");
    serveStatic(app);
  }

  const PORT = Number(process.env.PORT) || 65444; // Ensure PORT is a number

  server.listen(PORT, "0.0.0.0", () => {
    log(`🚀 Server running on http://localhost:${PORT} (${isDev ? "Development" : "Production"})`);
  });
})();
