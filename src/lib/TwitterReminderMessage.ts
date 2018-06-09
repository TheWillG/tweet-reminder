export class TwitterReminderMessage {
  public handle: string;
  public datetime: string;
  public msg: string;
  constructor(handle: string, datetime: string, msg: string) {
    this.handle = handle;
    this.datetime = datetime;
    this.msg = msg;
  }

  static create(obj: any): TwitterReminderMessage {
    const handle: string = obj.handle;
    const date: string = obj.date;
    const time: string = obj.time;
    const message: string = obj.message;
    const dateTime = TwitterReminderMessage.getDateTime(date, time);
    return new TwitterReminderMessage(handle, dateTime, message);
  }

  static getDateTime(date: string, time: string): string {
    const dateArr: Array<string> = date.split("/");
    const [month, day, year] = dateArr;
    const [timeString, ampm] = time.split(" ");
    const [hourStr, minuteStr] = timeString.split(":");
    let hours = Number(hourStr);
    const minute = Number(minuteStr);
    if (hours === 12) {
      hours = 0;
    }
    if (ampm.toLowerCase() === "pm") {
      hours += 12;
    }
    const dateTime: string =
      year +
      "-" +
      month +
      "-" +
      day +
      "T" +
      hours +
      ":" +
      minute +
      ":" +
      "00.000Z";
    return dateTime;
  }
}
