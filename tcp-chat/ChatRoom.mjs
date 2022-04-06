import net from 'net';

class ChatRoom {
  constructor() {
    this.chat_clients = [];
    this.chat_server = net.createServer();
  }
}
