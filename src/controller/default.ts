/** src/controllers/default.ts */
import { NextFunction, Request, Response } from "express";

const index = async (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: "hello world",
  });
};

const hello = async (req: Request, res: Response, next: NextFunction) => {
  const name = req.params.name ?? "world";

  return res.status(200).json({
    message: `hello ${name}`,
  });
};

export default { index, hello };
