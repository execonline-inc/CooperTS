import { warn } from '@execonline-inc/logging';
import { noop } from '@kofno/piper';
import i18next, * as i18n from '@prebsch-exo/i18next';
import { Task } from 'taskarian';
import { loaded, loadedFromFallback } from '../../translations';
import { Loader } from '../../types';

export const defaultSettings: i18n.InitOptions = {
  fallbackLng: 'en',
  ns: ['translations'],
  defaultNS: 'translations',
  debug: true,
  keySeparator: false,
  nsSeparator: false,
  interpolation: {
    escapeValue: false,
  },
};

export const initTask = (initializer: i18n.i18n, options: i18n.InitOptions): Loader =>
  new Task((reject, resolve) => {
    initializer
      .init(options, (err, translator) => {
        if (err) {
          reject(loadedFromFallback(translator, i18next.language, String(err)));
        } else {
          resolve(loaded(translator, i18next.language));
        }
      })
      .catch(err => warn(err));

    return noop;
  });
