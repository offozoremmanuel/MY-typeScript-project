import type { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user.model";

const parseId = (value: string): number | null => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

// POST /api/users
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, name } = req.body ?? {};

    if (!email || typeof email !== "string") {
      res.status(400).json({ error: "A valid email is required" });
      return;
    }

    const user = await UserModel.create({ email, name });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// GET /api/users
export const getUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// GET /api/users/:id
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseId(req.params.id as string);
    if (id === null) {
      res.status(400).json({ error: "Invalid user id" });
      return;
    }

    const user = await UserModel.findById(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

// PUT /api/users/:id
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseId(req.params.id as string);
    if (id === null) {
      res.status(400).json({ error: "Invalid user id" });
      return;
    }

    const { email, name } = req.body ?? {};
    const user = await UserModel.update(id, { email, name });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/users/:id
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseId(req.params.id as string);
    if (id === null) {
      res.status(400).json({ error: "Invalid user id" });
      return;
    }

    await UserModel.delete(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
