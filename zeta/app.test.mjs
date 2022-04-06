import http from 'http';
import assert from 'assert';

const options = {
  host: 'localhost',
  port: 9006,
  path: '/send',
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' }
};

const test_request = http.request(options, (res) => {
  res.setEncoding('utf8');
  let full_message = '';
  res.on('data', (chunk) => (full_message += chunk));
  res.on('end', () => {
    assert.strictEqual(full_message, '{"status":"ok","message":"Post received"}');
  });
});

test_request.write('user_post=test');
test_request.end();
