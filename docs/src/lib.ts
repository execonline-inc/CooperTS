import fs from 'fs';
import path from 'path';

export const getFilesFromPath = (pathName: string) => fs.readdirSync(path.join(pathName));

export const getMarkDownWithMeta = (pathName: string, slug: string) =>
  fs.readFileSync(path.join(pathName, slug), 'utf-8');
