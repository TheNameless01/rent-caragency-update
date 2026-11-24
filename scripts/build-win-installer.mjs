import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';

const require = createRequire(import.meta.url);

function hasWine() {
  if (process.platform === 'win32') return true;
  try {
    execFileSync('which', ['wine'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

if (process.platform !== 'win32' && !hasWine()) {
  // On headless Linux without Wine, use electron-builder's built-in pure-JS UninstallerReader
  // (the same path it already uses on macOS Catalina+ when 32-bit Wine is unavailable).
  const macosVersion = require('app-builder-lib/out/util/macosVersion');
  macosVersion.isMacOsCatalina = () => true;
}

const electronBuilder = require('electron-builder');

const artifacts = await electronBuilder.build({
  targets: electronBuilder.Platform.WINDOWS.createTarget(['nsis'], electronBuilder.Arch.x64),
  config: {
    npmRebuild: false,
  },
});

console.log('[build-win-installer] Generated artifacts:', artifacts);
