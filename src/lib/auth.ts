import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { memoryAdapter } from "better-auth/adapters/memory";
import prisma from "./prisma";
import { isDemoMode } from "./demo";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const demoMemoryDb: Record<string, unknown[]> = {};

export const auth = betterAuth({
  database: isDemoMode()
    ? memoryAdapter(demoMemoryDb)
    : prismaAdapter(prisma, {
        provider: "postgresql",
      }),
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    requireEmailVerification: false,
  },
  socialProviders:
    googleClientId && googleClientSecret
      ? {
          google: {
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          },
        }
      : undefined,
});
