"use strict";var i=require("@execonline-inc/logging"),U=require("taskarian");var o=require("@execonline-inc/environment"),n=()=>(0,o.readVarT)("GITHUB_CONTEXT"),c=()=>(0,o.readVarT)("SLACK_CHANNEL"),l=()=>(0,o.readVarT)("SLACK_WEBHOOK_URL");var u=require("@execonline-inc/error-handling");var d=require("@execonline-inc/decoders"),e=require("jsonous"),p=(0,e.succeed)({}).assign("joke",(0,e.field)("joke",e.string)),D=(0,e.succeed)({}).assign("login",(0,e.field)("login",e.string)).assign("htmlUrl",(0,e.field)("html_url",e.string)).assign("avatarUrl",(0,e.field)("avatar_url",e.string)),R=(0,e.succeed)({}).assign("href",(0,e.field)("href",e.string)),q=(0,e.succeed)({}).assign("self",(0,e.field)("self",R)),T=(0,e.succeed)({}).assign("links",(0,e.field)("_links",q)).assign("htmlUrl",(0,e.field)("html_url",e.string)).assign("user",(0,e.field)("user",D)).assign("title",(0,e.field)("title",e.string)),A=(0,e.succeed)({}).assign("name",(0,e.field)("name",e.string)),F=(0,e.succeed)({}).assign("action",(0,e.field)("action",(0,d.stringLiteral)("labeled"))).assign("label",(0,e.field)("label",A)).assign("pullRequest",(0,e.field)("pull_request",T)),k=(0,e.succeed)({}).assign("event",(0,e.field)("event",F));var m=t=>({kind:"slack-notifier-request-failed",message:t.kind}),f=t=>({kind:"event-decode-failed",message:t}),g=t=>({kind:"slack-notifier-request-succeeded",message:t});var x=t=>(0,u.asTask)(k.decodeJson(t.context).mapError(f));var a=require("ajaxios"),v=require("taskarian");var h=require("@execonline-inc/url"),s=require("ajaxios");var b="https://icanhazdadjoke.com/",N={field:"Accept",value:"application/json"},L=t=>(0,h.toUrlT)(t),M=t=>(0,s.toHttpTask)((0,s.get)(t.toString()).withHeader(N).withDecoder(p)),E=()=>L(b).andThen(M);var H=t=>`<!subteam^S047GU3AAA0|sre>, <${t.htmlUrl}|@${t.login}> needs a pull request reviewed.`,J=(t,r)=>({channel:r.slackChannel,username:"PRBot",attachments:[{title:`<${t.htmlUrl}|${t.title}>`,pretext:H(t.user),text:`"${r.dadJokeApiResponse.joke}"`,thumb_url:t.user.avatarUrl,mrkdwn_in:["text","pretext"]}]}),C=(t,r)=>(0,a.toHttpTask)((0,a.post)(r.slackWebhookUrl).withData(J(t.pullRequest,r))),_=t=>r=>C(t,r).mapError(m).map(g),S=t=>v.Task.succeed({}).assign("dadJokeApiResponse",E).assign("slackChannel",c).assign("slackWebhookUrl",l).andThen(_(t));U.Task.succeed({}).assign("context",n).assign("decodedEvent",x).andThen(({decodedEvent:t})=>S(t.event)).fork(t=>(0,i.logWithTimestamp)(JSON.stringify(t)),i.logWithTimestamp);
//# sourceMappingURL=index.cjs.map