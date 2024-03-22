import { noop } from '@kofno/piper';
import glob from 'glob';
import { Task } from 'taskarian';

import fs from 'fs';

export interface ReadFileError {
  kind: 'read-file-error';
  filename: string;
}

const readFileError = (filename: string): ReadFileError => ({ kind: 'read-file-error', filename });

export const readFileT = (filename: string): Task<ReadFileError, string> =>
  new Task((reject, resolve) => {
    try {
      resolve(fs.readFileSync(filename, { encoding: 'utf-8' }));
    } catch {
      reject(readFileError(filename));
    }
    return noop;
  });

export interface GlobError {
  kind: 'glob-error';
  pattern: string;
  error: Error;
}

const globError = (pattern: string, error: Error): GlobError => ({
  kind: 'glob-error',
  pattern,
  error,
});

export const globT = (pattern: string): Task<GlobError, Array<string>> =>
  new Task((reject, resolve) => {
    glob(pattern, (err, matches) => (err ? reject(globError(pattern, err)) : resolve(matches)));
    return noop;
  });
