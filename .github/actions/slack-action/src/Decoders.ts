import { stringLiteral } from '@execonline-inc/decoders';
import Decoder, { field, number, string, succeed } from 'jsonous';
import { Event, Joke, Label, Links, Message, PullRequest, Self, User } from './Types';

export const jokeDecoder: Decoder<Joke> = succeed({})
  .assign('id', field('id', string))
  .assign('joke', field('joke', string))
  .assign('status', field('status', number));

const userDecoder: Decoder<User> = succeed({})
  .assign('login', field('login', string))
  .assign('htmlUrl', field('html_url', string))
  .assign('avatarUrl', field('avatar_url', string));

const selfDecoder: Decoder<Self> = succeed({}).assign('href', field('href', string));
const linksDecoder: Decoder<Links> = succeed({}).assign('self', field('self', selfDecoder));

const pullRequestDecoder: Decoder<PullRequest> = succeed({})
  .assign('links', field('_links', linksDecoder))
  .assign('htmlUrl', field('html_url', string))
  .assign('user', field('user', userDecoder))
  .assign('title', field('title', string));

const labelDecoder: Decoder<Label> = succeed({}).assign('name', field('name', string));

const eventDecoder: Decoder<Event> = succeed({})
  .assign('action', field('action', stringLiteral('labeled')))
  .assign('label', field('label', labelDecoder))
  .assign('pullRequest', field('pull_request', pullRequestDecoder));

export const messageDecoder: Decoder<Message> = succeed({}).assign(
  'event',
  field('event', eventDecoder),
);
