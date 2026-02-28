import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    errorFormat: "minimal",
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export const db = {
  lead: {
    create: (data: any) => prisma.lead.create({ data }),
    findById: (id: string) => prisma.lead.findUnique({ where: { id } }),
    update: (id: string, data: any) =>
      prisma.lead.update({ where: { id }, data }),
    markAsSynced: (id: string, telecrmId?: string) =>
      prisma.lead.update({
        where: { id },
        data: {
          telecrmSynced: true,
          telecrmId,
          syncedAt: new Date(),
        },
      }),
    markAsFailed: (id: string, error: string) =>
      prisma.lead.update({
        where: { id },
        data: {
          telecrmSynced: false,
          error,
        },
      }),
    findAll: (params?: {
      status?: string;
      formName?: string;
      startDate?: Date;
      endDate?: Date;
      limit?: number;
      page?: number;
    }) => {
      const { status, formName, startDate, endDate, limit = 100, page = 1 } = params || {};
      const where: any = {};
      
      if (status) where.status = status;
      if (formName) where.formName = formName;
      if (startDate || endDate) {
        where.createdAt = {};
        if (startDate) where.createdAt.gte = startDate;
        if (endDate) where.createdAt.lte = endDate;
      }
      
      return prisma.lead.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      });
    },
  },
  health: () => prisma.$queryRaw`SELECT 1`,
};