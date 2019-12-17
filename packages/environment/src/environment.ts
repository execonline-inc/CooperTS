import { noop } from "@kofno/piper";
import { fromNullable, Maybe } from "maybeasy";
import { err, ok, Result } from "resulty";
import Task from "taskarian";

export interface MissingVarError {
  kind: "missing-var-error";
  key: string;
}

export const missingVarError = (key: string): MissingVarError => ({
  kind: "missing-var-error",
  key
});

export const readVarM = (key: string): Maybe<string> =>
  fromNullable(process.env[key]);

export const readVarR = (key: string): Result<MissingVarError, string> =>
  readVarM(key).cata({
    Just: ok,
    Nothing: () => err(missingVarError(key))
  }) as Result<MissingVarError, string>;

export const readVarT = (key: string): Task<MissingVarError, string> =>
  new Task((reject, resolve) => {
    readVarR(key).cata({
      Ok: resolve,
      Err: reject
    });
    return noop;
  });

export interface Production {
  kind: "production";
}

export interface Development {
  kind: "development";
}

export interface Unknown {
  kind: "unknown";
}

export type Environment = Production | Development | Unknown;

export const environment = (): Environment => {
  return readVarM("NODE_ENV")
    .map(env => {
      switch (env) {
        case "production":
          return { kind: "production" } as Environment;
        case "development":
          return { kind: "development" } as Environment;
        default:
          return { kind: "unknown" } as Environment;
      }
    })
    .getOrElseValue({ kind: "unknown" });
};
