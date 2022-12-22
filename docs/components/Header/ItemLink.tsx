import clsx from 'clsx';
import { observer } from 'mobx-react';
import Link from 'next/link';

interface Props {
  href: string;
  children: React.ReactNode;
}

const ItemLink: React.FC<Props> = ({ href, children }) => (
  <Link href={href}>
    <a
      className={clsx(
        'font-medium text-gray-600 hover:text-gray-900',
        'dark:text-gray-300 dark:hover:text-white',
      )}
    >
      {children}
    </a>
  </Link>
);

export default observer(ItemLink);
