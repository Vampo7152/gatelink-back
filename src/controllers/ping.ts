import { Request, Response } from "express";

const ping = (_req: Request, res: Response) => {
  return res.status(200).json({
    message: "Pong!",
  });
};

export default ping;
