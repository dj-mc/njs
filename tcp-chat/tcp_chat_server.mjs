import net from 'net';

const chat_server = net.createServer();

chat_server.on('connection', function (client) {
  client.write('Client connected');
  client.on('data', function (data) {
    console.log(data);
  });
  client.on('close', function () {
    client.write('Client closed\n');
    client.end();
  });
});

chat_server.listen(9001);
