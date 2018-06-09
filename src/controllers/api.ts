"use strict";

import { Response, Request } from "express";
import Joi, { ValidationResult } from "joi";
import express from "express";
import tweetReminderValidator from "../validators/tweetReminderValidator";
import { craftTweetReminderErrorMessage } from "../validators/tweetReminderValidator";
import queueSender from "../lib/QueueSender";
import { TwitterReminderMessage } from "../lib/TwitterReminderMessage";

/**
 * API routes
 */
const router = express.Router();
router.post("/reminder/tweet", (req: Request, res: Response) => {
  const { body } = req;
  const result: ValidationResult<object> = Joi.validate(
    body,
    tweetReminderValidator
  );
  if (result.error) {
    req.flash("errors", craftTweetReminderErrorMessage(result));
  } else {
    const message = TwitterReminderMessage.create(body);
    console.log("Sending message to queue ");
    queueSender.send(message);
    req.flash("success", "Great, your reminder will be sent");
  }
  res.redirect("/");
});

export default router;
