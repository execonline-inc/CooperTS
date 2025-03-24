import { Decoder, string } from 'jsonous';
import { err, ok } from 'resulty';
import { PackageDir } from './Types';

const packageDirFromStringDecoder = (str: string): Decoder<PackageDir> =>
  new Decoder<PackageDir>(() => {
    const elements = str.split('/packages/');
    if (elements.length >= 2) {
      const [first, ...rest] = elements;
      const path: PackageDir = `${first}/packages/${rest.join('/packages/')}`;
      return ok(path);
    } else {
      return err(`Expected a PackageDir, but received string: ${JSON.stringify(str)}`);
    }
  });

export const packageDirDecoder: Decoder<PackageDir> = string.andThen(packageDirFromStringDecoder);
