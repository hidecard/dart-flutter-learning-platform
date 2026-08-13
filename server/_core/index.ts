import "dotenv/config";
import { createServer } from "http";
import net from "net";
import { createApp } from "./app";

type AppOptions = {
  development?: boolean;
  serveClient?: boolean;
};

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function configureApp(options: AppOptions = {}) {
  const app = await createApp();
  const development = options.development ?? process.env.NODE_ENV === "development";
  // development mode uses Vite, production mode uses static files
  if (development) {
    const { setupVite } = await import("./vite");
    const server = createServer(app);
    await setupVite(app, server);
  } else if (options.serveClient ?? true) {
    const { serveStatic } = await import("./vite");
    serveStatic(app);
  }

  return app;
}

async function startServer() {
  const app = await configureApp({ development: process.env.NODE_ENV === "development" });
  const server = createServer(app);

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

if (!process.env.VERCEL) {
  startServer().catch(console.error);
}
