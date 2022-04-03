import { EventEmitter } from 'events';
import { readFile, readFileSync } from 'fs';
import { readFile as rf } from 'fs/promises';

async function wrap() {
  // Top-level await in node v14.3.0+
  // Otherwise wrap in an async function
  const my_file = await rf('./txt.txt', 'utf-8');
  console.log(`Top-level await:\n${my_file}`);
}

wrap();

console.log(`Hello, ${process.env.USER}!`);

readFile('./txt.txt', 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Or
const txt_data = readFileSync('./txt.txt', 'utf-8');
console.log(txt_data);

const emitter = new EventEmitter();
emitter.on('dawn', () => {
  console.log("It's daylight");
});
emitter.on('dusk', () => {
  console.log('Goto bed soon');
});

function is_daylight() {
  const d = new Date();
  const hours = d.getHours();
  console.log(`It's about ${hours} O'clock`);
  if (6 <= hours && hours <= 18) return true;
  else return false;
}

if (is_daylight()) emitter.emit('dawn');
else emitter.emit('dusk');

process.on('exit', () => {
  console.log('Exiting program');
});
