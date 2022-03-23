import net from 'net';

const chat_clients = [];
const chat_server = net.createServer();

chat_server.on('connection', function (client) {
  chat_clients.push(client);
  client.write(`${client} connected`);

  client.on('data', function (data) {
    chat_clients.forEach((chatter) => {
      chatter.write(data);
    });
  });

  client.on('close', function () {
    client.write(`${client} closed`);
    client.end();
  });
});

chat_server.listen(9001);
