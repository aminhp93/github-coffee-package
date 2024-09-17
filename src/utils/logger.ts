/* eslint-disable no-console */
type LogParams = unknown[];

export const log = (...params: LogParams): void => {
  console.log(...params);
};

export const errorLog = (...params: LogParams): void => {
  console.error(...params);
};
