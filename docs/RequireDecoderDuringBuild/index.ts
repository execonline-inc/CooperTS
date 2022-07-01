import Decoder from 'jsonous';
import { Result } from 'resulty';

const raise = (err: unknown): never => {
  throw `[EXO] ${err}`;
};

export const requireResultDuringBuild = <T>(result: Result<unknown, T>): T =>
  result.elseDo(raise).getOrElse(() => raise('Unreachable'));

export const requireDecoderDuringBuild = <T>(decoder: Decoder<T>) => (data: unknown): T =>
  requireResultDuringBuild(decoder.decodeAny(data));
