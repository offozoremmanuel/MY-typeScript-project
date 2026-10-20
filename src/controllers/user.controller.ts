import type { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user.model";

// Turn the ID from the URL into a number. Return null when it is not valid.
function getUserId(idFromUrl: string): number | null {
  const id = Number(idFromUrl);

  if (!Number.isInteger(id) || id < 1) {
    return null;
  }

  return id;
}

// POST /api/users - Create a new user
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body?.email;
    const name = req.body?.name;

    if (typeof email !== "string" || email.length === 0) {
      res.status(400).json({ error: "A valid email is required" });
      return;
    }

    const newUser = await UserModel.create({ email, name });
    res.status(201).json(newUser);
  } catch (error) {
    // Pass errors to the error-handling middleware.
    next(error);
  }
};

// GET /api/users - Get every user
export const getUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// GET /api/users/:id - Get one user
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = getUserId(req.params.id as string);

    if (id === null) {
      res.status(400).json({ error: "Invalid user id" });
      return;
    }

    const user = await UserModel.findById(id);

    if (user === null) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

// PUT /api/users/:id - Update a user
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = getUserId(req.params.id as string);

    if (id === null) {
      res.status(400).json({ error: "Invalid user id" });
      return;
    }

    const email = req.body?.email;
    const name = req.body?.name;
    const updatedUser = await UserModel.update(id, { email, name });

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/users/:id - Delete a user
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = getUserId(req.params.id as string);

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
