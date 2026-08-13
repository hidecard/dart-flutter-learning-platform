import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { getLocalSessionUser, LocalAuthenticatedUser, readLocalSessionToken } from "../localAuth";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: LocalAuthenticatedUser | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  const user = await getLocalSessionUser(readLocalSessionToken(opts.req));

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
