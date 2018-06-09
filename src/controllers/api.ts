"use strict";

import { Response, Request } from "express";
import express from "express";

/**
 * API routes
 */
const router = express.Router();
router.post("/reminder/tweet", (req: Request, res: Response) => {
  console.log("req.body", req.body);
  req.flash("success", "Great, your reminder will be sent");
  res.redirect("/");
});

export default router;
