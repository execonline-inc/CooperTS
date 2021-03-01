const defaultPrefix = '[EXO]';

export const logger = (prefix: string) => (...messages: any): void => {
  console.log(prefix, ...messages);
};

export const warner = (prefix: string) => (...messages: any): void => {
  console.warn(prefix, ...messages);
};

export const log = logger(defaultPrefix);

export const warn = warner(defaultPrefix);

export const warnAndNotify = (notify: (...args: any[]) => any) => (
  errorName: string,
  message: string,
  context: {}
): void => {
  warn(message);
  notify(errorName, message, { context });
};
