import { HttpError, post, toHttpTask } from 'ajaxios';
import Task from 'taskarian';
import { slackChannel, slackWebhookUrl } from '../Environment';
import { getZenQuote } from '../Quote';
import {
  Event,
  ActionFailed,
  PullRequest,
  SlackMessage,
  SlackNotificationSuccess,
  SlackNotifierRequestFailed,
  slackNotifierRequestFailed,
  slackNotifierRequestSucceded,
  User,
} from '../Types';

const pretext = (user: User) =>
  `<!subteam^S047GU3AAA0|sre>, <${user.htmlUrl}|@${user.login}> needs a pull request reviewed.`;

const messageBody = (pullRequest: PullRequest, slackMessage: SlackMessage) => ({
  channel: slackMessage.slackChannel,
  username: 'PRBot',
  attachments: [
    {
      title: `<${pullRequest.htmlUrl}|${pullRequest.title}>`,
      pretext: pretext(pullRequest.user),
      text: `"${slackMessage.zenQuote.quote}"`,
      thumb_url: pullRequest.user.avatarUrl,
      mrkdwn_in: ['text', 'pretext'],
    },
  ],
});

const buildRequestT = (event: Event, slackMessage: SlackMessage): Task<HttpError, unknown> =>
  toHttpTask(
    post(slackMessage.slackWebhookUrl).withData(messageBody(event.pullRequest, slackMessage)),
  );

const postQuoteToSlack =
  (event: Event) =>
  (slackMessage: SlackMessage): Task<SlackNotifierRequestFailed, SlackNotificationSuccess> =>
    buildRequestT(event, slackMessage)
      .mapError(slackNotifierRequestFailed)
      .map(slackNotifierRequestSucceded);

export const sendMessage = (event: Event) =>
  Task.succeed<ActionFailed, {}>({})
    .assign('zenQuote', getZenQuote)
    .assign('slackChannel', slackChannel)
    .assign('slackWebhookUrl', slackWebhookUrl)
    .andThen(postQuoteToSlack(event));
