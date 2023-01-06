import { Router, withRouter } from 'next/router';
import * as React from 'react';

interface Props {
  router: Router;
  withPathname: (pathname: string) => boolean;
  children: React.ReactElement;
}

const WhenPage: React.FC<Props> = ({ router, withPathname: predicate, children }) => {
  return predicate(router.pathname) ? children : <></>;
};

export default withRouter(WhenPage);
