import { Request, Response, NextFunction } from "express";
export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user) {
    next();
  } else {
    res.status(401).send("You must login first!");
  }
}
export function isAuthorized(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role === "ADMIN") {
    next();
  } else {
    res.status(403).send("You are not Admin!");
  }
}
