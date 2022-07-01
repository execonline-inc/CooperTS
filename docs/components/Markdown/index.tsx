import clsx from 'clsx';
import hljs from 'highlight.js';
import 'highlight.js/styles/a11y-dark.css';
import { marked } from 'marked';
import { observer } from 'mobx-react';
import * as React from 'react';
import { SafeMarkdown } from '../../Types/guide';

interface Props {
  markdown: SafeMarkdown;
}

const markdownToHtmlString = (markdown: SafeMarkdown): string =>
  marked(markdown.content, {
    highlight: function(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
  });

const Markdown: React.FC<Props> = ({ markdown }) => (
  <div
    className={clsx(
      'prose prose-slate w-full lg:max-w-none',
      'prose-headings:scroll-mt-28',
      'prose-headings:font-display prose-headings:font-normal',
      'prose-lead:text-slate-500',
      'prose-a:font-semibold prose-a:no-underline',
      'prose-a:shadow-[var(--proseAShadow)]',
      'hover:prose-a:[--tw-prose-underline-size:6px]',
      'prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg',
      'prose-pre:p-3 md:prose-pre:p-5',
      'prose-pre:text-xs md:prose-pre:text-sm lg:prose-pre:text-base',
      'dark:prose-invert dark:text-slate-400',

      'dark:[--tw-prose-background:theme(colors.slate.900)] dark:prose-lead:text-slate-400',
      'dark:prose-a:text-sky-400',

      'dark:prose-a:shadow-[var(--darkProseAShadow)]',
      'dark:hover:prose-a:[--tw-prose-underline-size:6px]',
      'dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1',

      'dark:prose-pre:ring-slate-300/10 dark:prose-hr:border-slate-800',
      'lg:prose-headings:scroll-mt-[8.5rem]'
    )}
    dangerouslySetInnerHTML={{
      __html: markdownToHtmlString(markdown),
    }}
  />
);

export default observer(Markdown);
