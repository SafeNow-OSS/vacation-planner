import * as migration_20250410_091600 from './20250410_091600';

export const migrations = [
  {
    up: migration_20250410_091600.up,
    down: migration_20250410_091600.down,
    name: '20250410_091600'
  },
];
