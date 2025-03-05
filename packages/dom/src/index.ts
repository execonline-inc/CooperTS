import { noop } from '@kofno/piper';
import { Task } from 'taskarian';

export interface ElementNotFound {
  kind: 'element-not-found';
  message: string;
}

export interface DOMFailure {
  kind: 'dom-failure';
  message: string;
}

export type DOMError = ElementNotFound | DOMFailure;

export const createElement = (tagName: string): Task<DOMFailure, HTMLElement> =>
  new Task<DOMFailure, HTMLElement>((reject, resolve) => {
    try {
      const el = document.createElement(tagName);
      resolve(el);
    } catch (e) {
      reject({
        kind: 'dom-failure',
        message: String(e),
      });
    }
    return noop;
  });

export const getElementById = (elementId: string): Task<DOMError, HTMLElement> =>
  new Task<DOMError, HTMLElement>((reject, resolve) => {
    try {
      const el = document.getElementById(elementId);
      if (el) {
        resolve(el);
      } else {
        reject({
          kind: 'element-not-found',
          message: `Element '${elementId} not found`,
        });
      }
    } catch (e) {
      reject({
        kind: 'dom-failure',
        message: String(e),
      });
    }
    return noop;
  });

export const appendChild = (
  existingEl: HTMLElement,
  newChild: HTMLElement
): Task<DOMFailure, HTMLElement> =>
  new Task<DOMFailure, HTMLElement>((reject, resolve) => {
    try {
      const el = existingEl.appendChild(newChild);
      resolve(el);
    } catch (e) {
      reject({
        kind: 'dom-failure',
        message: String(e),
      });
    }
    return noop;
  });

export const removeChild = (
  parent: HTMLElement,
  child: HTMLElement
): Task<DOMFailure, HTMLElement> =>
  new Task<DOMFailure, HTMLElement>((reject, resolve) => {
    try {
      const el = parent.removeChild(child);
      resolve(el);
    } catch (e) {
      reject({
        kind: 'dom-failure',
        message: String(e),
      });
    }
    return noop;
  });
