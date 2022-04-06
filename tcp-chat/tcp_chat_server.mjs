import net from 'net';

const chat_clients = [];
const chat_server = net.createServer();

function welcome(client) {
  client.name = `${client.remoteAddress}:${client.remotePort}`;
  chat_clients.push(client);
  client.write(`${client.name} connected`);
}

function send_message(message, client) {
  const lost_clients = [];
  chat_clients.forEach((chatter) => {
    if (client !== chatter) {
      if (chatter.writable) {
        chatter.write(`${client.name} says ${message}`);
      } else {
        lost_clients.push(chatter);
        chatter.destroy();
      }
    }
  });
  lost_clients.forEach((client) => chat_clients.splice(chat_clients.lastIndexOf(client), 1));
}

chat_server.on('connection', (incoming_client) => {
  welcome(incoming_client);
  incoming_client.on('data', (data) => send_message(data, incoming_client));

  incoming_client.on('close', () => {
    incoming_client.write(`${incoming_client} left`);
    chat_clients.splice(chat_clients.indexOf(incoming_client));
    incoming_client.end();
  });

  incoming_client.on('error', (e) => console.log(e));
});

chat_server.listen(9001);
