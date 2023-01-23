import { MissingVarError } from '@execonline-inc/environment';
import { HttpError } from 'ajaxios';

export interface MessageArgs {
  decodedEvent: Message;
}

export type ActionFailed =
  | MissingVarError
  | EventDecodeFailed
  | HttpError
  | SlackNotifierRequestFailed;

export interface SlackNotifierRequestFailed {
  kind: 'slack-notifier-request-failed';
  message: string;
}

export const slackNotifierRequestFailed = (err: HttpError): SlackNotifierRequestFailed => ({
  kind: 'slack-notifier-request-failed',
  message: err.kind,
});

export interface EventDecodeFailed {
  kind: 'event-decode-failed';
  message: string;
}

export const eventDecodeFailed = (err: string): EventDecodeFailed => ({
  kind: 'event-decode-failed',
  message: err,
});

export interface SlackNotificationSuccess {
  kind: 'slack-notifier-request-succeeded';
  message: unknown;
}

export const slackNotifierRequestSucceded = (s: unknown): SlackNotificationSuccess => ({
  kind: 'slack-notifier-request-succeeded',
  message: s,
});

export interface MessageDecoderFailed {
  kind: 'message-decoder-failed';
  message: string;
}

export interface SlackMessage {
  zenQuote: ZenQuote;
  slackChannel: string;
  slackWebhookUrl: string;
}

export interface ZenQuote {
  quote: string;
  author: string;
}
export interface User {
  login: string;
  htmlUrl: string;
  avatarUrl: string;
}

export interface Message {
  event: Event;
}

export type Action = 'labeled';

export interface Event {
  action: Action;
  label: Label;
  pullRequest: PullRequest;
}

export interface Label {
  name: string;
}

export interface PullRequest {
  links: Links;
  htmlUrl: string;
  user: User;
  title: string;
}

export interface Links {
  self: Self;
}

export interface Self {
  href: string;
}
