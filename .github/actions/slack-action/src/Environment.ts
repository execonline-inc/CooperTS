import { readVarT } from '@execonline-inc/environment';

export const readContext = () => readVarT('GITHUB_CONTEXT');
export const slackChannel = () => readVarT('SLACK_CHANNEL');
export const slackWebhookUrl = () => readVarT('SLACK_WEBHOOK_URL');
