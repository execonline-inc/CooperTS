export interface NavLink {
  title: string;
  href: string;
}

export interface NavSection {
  title: string;
  links: Array<NavLink>;
  href: string;
}

export type NavTree = Array<NavSection>;
