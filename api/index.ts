import type { IncomingMessage, ServerResponse } from "http";
import { createApp } from "../server/_core/index";

let appPromise: ReturnType<typeof createApp> | null = null;

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  appPromise ??= createApp({ development: false, serveClient: false });
  const app = await appPromise;
  return app(req, res);
}
