import { prisma } from "../config/db";

export interface CreateUserInput {
  email: string;
  name?: string;
}

export interface UpdateUserInput {
  email?: string;
  name?: string;
}

export const UserModel = {
  create: (data: CreateUserInput) => prisma.user.create({ data }),

  findAll: () => prisma.user.findMany({ orderBy: { createdAt: "desc" } }),

  findById: (id: number) => prisma.user.findUnique({ where: { id } }),

  update: (id: number, data: UpdateUserInput) =>
    prisma.user.update({ where: { id }, data }),

  delete: (id: number) => prisma.user.delete({ where: { id } }),
};