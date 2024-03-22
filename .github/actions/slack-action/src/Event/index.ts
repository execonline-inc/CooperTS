import { asTask } from '@execonline-inc/error-handling';
import { Task } from 'taskarian';
import { messageDecoder } from '../Decoders';
import { ActionFailed, Message, eventDecodeFailed } from '../Types';

interface EventObject {
  context: string;
}

export const decodeEvent = (event: EventObject): Task<ActionFailed, Message> =>
  asTask(messageDecoder.decodeJson(event.context).mapError<ActionFailed>(eventDecodeFailed));
