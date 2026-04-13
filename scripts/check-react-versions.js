#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const packagePaths = [
  'package.json',
  'apps/web/package.json',
  'apps/native/package.json',
  'packages/ui/package.json',
  'packages/store/package.json',
  'packages/api/package.json',
];

const versions = {};
const issues = [];

// Read root package.json to get the source of truth
const rootPkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const rootReactVersion = rootPkg.devDependencies?.react;
const rootReactDomVersion = rootPkg.devDependencies?.['react-dom'];
const rootReactNativeVersion = rootPkg.devDependencies?.['react-native'];
const rootTypeScriptVersion = rootPkg.devDependencies?.typescript;

if (!rootReactVersion) {
  console.error('❌ React version not found in root package.json devDependencies');
  process.exit(1);
}

console.log('📦 Checking React versions across monorepo...\n');
console.log(`Root versions:`);
console.log(`  react: ${rootReactVersion}`);
console.log(`  react-dom: ${rootReactDomVersion}`);
console.log(`  react-native: ${rootReactNativeVersion}`);
console.log(`  typescript: ${rootTypeScriptVersion}\n`);

packagePaths.forEach((pkgPath) => {
  if (!fs.existsSync(pkgPath)) return;

  const content = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const name = content.name || path.dirname(pkgPath);
  
  // Check for duplicate definitions in local packages
  const deps = content.dependencies || {};
  const devDeps = content.devDependencies || {};
  const peerDeps = content.peerDependencies || {};

  // Apps should have exact versions
  if (pkgPath.includes('apps/')) {
    if (deps.react && !deps.react.includes(rootReactVersion.replace(/^\^|~/, ''))) {
      issues.push(`⚠️  ${name}: React version mismatch. Expected ${rootReactVersion}, got ${deps.react}`);
    }
    if (deps['react-dom'] && !deps['react-dom'].includes(rootReactDomVersion.replace(/^\^|~/, ''))) {
      issues.push(`⚠️  ${name}: React-DOM version mismatch. Expected ${rootReactDomVersion}, got ${deps['react-dom']}`);
    }
    if (deps['react-native'] && !deps['react-native'].includes(rootReactNativeVersion.replace(/^\^|~/, ''))) {
      issues.push(`⚠️  ${name}: React-Native version mismatch. Expected ${rootReactNativeVersion}, got ${deps['react-native']}`);
    }
  }

  // Packages should NOT have react/react-native in dependencies (only peerDeps)
  if (pkgPath.includes('packages/')) {
    if (deps.react || deps['react-native'] || deps['react-dom']) {
      issues.push(`❌ ${name}: Should not have react/react-native in dependencies. Use peerDependencies instead.`);
    }
    if (devDeps.react || devDeps['react-native'] || devDeps.typescript || devDeps['@types/react']) {
      issues.push(`❌ ${name}: Remove react, react-native, typescript, @types/react from devDependencies (defined in root).`);
    }
  }

  console.log(`✓ ${name}`);
});

console.log('');

if (issues.length > 0) {
  console.error('\n❌ Issues found:\n');
  issues.forEach((issue) => console.error(issue));
  process.exit(1);
} else {
  console.log('✅ All React versions are consistent!\n');
  process.exit(0);
}
