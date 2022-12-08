import * as React from 'react';
import CardLink from './CardLink';

const CardLinks: React.FC = () => {
  return (
    <div className="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
      <CardLink href="/about" title="About" subtitle="A general overview of CooperTS on one page" />
      <CardLink
        href="/guide"
        title="Guide"
        subtitle="Learn about CooperTS in a series of introductory pages"
      />
      <CardLink
        href="/packages"
        title="Packages"
        subtitle="In-depth information on CooperTS packages and their APIs"
      />
      <CardLink
        href="/examples"
        title="Examples"
        subtitle="Discover boilerplate example CooperTS projects"
      />
      <CardLink
        href="/faq"
        title="FAQs"
        subtitle="Explore frequently asked questions and helpful tips"
      />
    </div>
  );
};
export default CardLinks;
