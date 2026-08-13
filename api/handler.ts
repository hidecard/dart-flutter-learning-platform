import type { IncomingMessage, ServerResponse } from "http";
import { createApp } from "../server/_core/app";

let appPromise: ReturnType<typeof createApp> | null = null;

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  appPromise ??= createApp();
  const app = await appPromise;
  return app(req, res);
}
