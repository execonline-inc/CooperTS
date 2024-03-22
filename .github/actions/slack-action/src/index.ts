import { logWithTimestamp } from '@execonline-inc/logging';
import { Task } from 'taskarian';
import { readContext } from './Environment';
import { decodeEvent } from './Event';
import { sendMessage } from './SlackMessage';
import { ActionFailed } from './Types';

Task.succeed<ActionFailed, {}>({})
  .assign('context', readContext)
  .assign('decodedEvent', decodeEvent)
  .andThen(({ decodedEvent }) => sendMessage(decodedEvent.event))
  .fork(err => logWithTimestamp(JSON.stringify(err)), logWithTimestamp);
