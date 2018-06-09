import Joi, { ValidationResult } from "joi";

const dateRegex: RegExp = /(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
const timeRegex: RegExp = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9] (am|pm|AM|PM)$/;

const schema = Joi.object().keys({
  handle: Joi.string()
    .alphanum()
    .max(30)
    .required(),
  date: Joi.string()
    .regex(dateRegex)
    .required(),
  time: Joi.string()
    .regex(timeRegex)
    .required(),
  message: Joi.string().required()
});

export const craftTweetReminderErrorMessage = (
  result: ValidationResult<object>
): string => {
  const error = result.error.details[0];
  const path: Array<string> = error.path;
  const message: string = error.message;
  if (path.includes("handle")) {
    return message.replace('"handle"', "Twitter handle");
  } else if (path.includes("date")) {
    return "Date failed to match pattern \'MM/DD/YY\' or is invalid.";
  } else if (path.includes("time")) {
    return "Time failed to match pattern \'HH:MM am/pm\' or is invalid.";
  } else if (path.includes("message")) {
    return message.replace('"message"', "Message");
  }
  return "An unknown error occurred. Please double check inputs.";
};

export default schema;
