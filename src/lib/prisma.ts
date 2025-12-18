import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { resolve } from 'path';

// Explicitly load .env file (not .env.local) to ensure DATABASE_URL comes from .env
// override: true ensures it overrides any DATABASE_URL from .env.local
dotenv.config({ path: resolve(process.cwd(), '.env'), override: true });

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// For Prisma v7, the connection URL is configured in prisma.config.ts
// We explicitly load .env to ensure DATABASE_URL comes from .env and not .env.local
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
