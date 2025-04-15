import * as fs from 'fs';
import * as path from 'path';

const packageJsonPath = path.resolve(process.cwd(), 'package.json');

// Helper function to read package.json
function readPackageJson(): any {
  if (!fs.existsSync(packageJsonPath)) {
    console.error('Error: package.json not found in the current directory.');
    process.exit(1);
  }

  const content = fs.readFileSync(packageJsonPath, 'utf-8');
  return JSON.parse(content);
}

// Helper function to write package.json
function writePackageJson(data: any): void {
  fs.writeFileSync(packageJsonPath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

// Helper function to bump version
function bumpVersion(version: string, type: 'major' | 'minor' | 'patch'): string {
  const versionParts = version.split('.').map(Number);

  if (versionParts.length !== 3 || versionParts.some((part) => isNaN(part) || part < 0)) {
    throw new Error(`Invalid version format: ${version}`);
  }

  const [major, minor, patch] = versionParts;

  switch (type) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      throw new Error(`Unknown version bump type: ${type}`);
  }
}

// Main function
function main() {
  const args = process.argv.slice(2);

  if (args.length !== 1 || !['--major', '--minor', '--patch'].includes(args[0])) {
    console.error('Usage: bump-version --major | --minor | --patch');
    process.exit(1);
  }

  const bumpType = args[0].replace('--', '') as 'major' | 'minor' | 'patch';

  const packageJson = readPackageJson();
  const currentVersion = packageJson.version;

  if (!currentVersion) {
    console.error('Error: No version field found in package.json.');
    process.exit(1);
  }

  const newVersion = bumpVersion(currentVersion, bumpType);
  packageJson.version = newVersion;

  writePackageJson(packageJson);

  console.log(`Version bumped from ${currentVersion} to ${newVersion}`);
}

main();
