import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers["authorization"]?.split(" ")[1]) {
    try {
      await axios
        .get("https://gated-solana-links.us.auth0.com/userinfo", {
          headers: {
            Authorization: `Bearer ${
              req.headers["authorization"]?.split(" ")[1]
            }`,
          },
        })
        .then((response: AxiosResponse) => {
          if (response.status === 200) {
            next();
          } else {
            return res.status(401).json({
              message: "Unauthorized",
            });
          }
        })
        .catch((error) => {
          throw error;
        });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err,
      });
    }
  } else {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default verifyToken;
