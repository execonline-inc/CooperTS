export type PackageDir = `${string}/packages/${string}`;

export const festivePossumPackagesPath = 'https://raw.githubusercontent.com/kofno/festive-possum/main/packages' as const;

export type GithubFestivePossumPath = `${typeof festivePossumPackagesPath}/${string}`;
