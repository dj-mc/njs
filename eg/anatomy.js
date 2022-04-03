import http from 'http';

const server = http.createServer();

server.on('request', (req, res) => {
  const { headers, method, url } = req;
  const user_agent = headers['user-agent'];
  console.log(user_agent);
  console.log(`Headers: ${headers}\nMethod: ${method}\nURL: ${url}`);

  let body = [];
  req
    .on('error', (err) => {
      console.log(err.stack);
    })
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();
      console.log(body);
    });

  res.on('error', (err) => {
    console.log(err);
  });

  const res_body = { headers, method, url, body };
  res.writeHead(200, { 'content-type': 'text/html' }).end(`
  <html><body>
  <h1>Anatomy of a HTTP request </h1><br />
  ${JSON.stringify(res_body, null, 2)}
  </body></html>
  `);
});

server.listen(8080, () => {
  console.log('Server is live');
});
