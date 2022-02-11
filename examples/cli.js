'use strict';

import path from 'path';

const user_name = process.argv[2];

debugger;

if (!user_name) {
  const file_name = process.argv[1].split(path.sep).pop();
  console.error('Missing argument! Example: node %s YOUR_NAME', file_name);
  process.exit(1);
}

console.log(`Hello, ${user_name}`);
