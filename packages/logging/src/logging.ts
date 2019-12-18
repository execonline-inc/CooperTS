import * as Honeybadger from "honeybadger-js";

const defaultPrefix = "[EXO]";

export const logger = (prefix: string) => (...messages: any): void => {
  console.log(prefix, ...messages);
};

export const warner = (prefix: string) => (...messages: any): void => {
  console.warn(prefix, ...messages);
};

export const log = logger(defaultPrefix);

export const warn = warner(defaultPrefix);

export const warnAndNotify = (
  errorName: string,
  message: string,
  context: {}
): void => {
  warn(message);
  Honeybadger.notify(errorName, message, { context });
};
