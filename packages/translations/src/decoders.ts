import { Decoder, string } from 'jsonous';
import { alreadyTranslated } from './translations';
import { AlreadyTranslatedText } from './types';

export const alreadyTranslatedText: Decoder<AlreadyTranslatedText> = string.map(alreadyTranslated);
