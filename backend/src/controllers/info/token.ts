import { Request, Response } from "express";

import tokenResource from "../../models/tokenResource";

const getTokenResourceInfo = async (req: Request, res: Response) => {
  const resourceId = req.body.resourceId;

  if (!resourceId) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  const verificationType = resourceId.split("-")[1];

  if (verificationType !== "tkn") {
    return res.status(400).json({
      message: "Invalid resourceId",
    });
  }

  try {
    tokenResource.findOne({ resourceId: resourceId }).then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: "Resource not found",
        });
      } else {
        return res.status(200).json({
          message: "Successfully grabbed resource!",
          resource: doc,
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
};

export default getTokenResourceInfo;
