import type { Request, Response, NextFunction } from "express";

type Handler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

// Forwards any thrown error to the error middleware
export const asyncHandler =
  (fn: Handler) => (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
