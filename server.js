// server.js
const WebSocket = require('ws');

// Create WebSocket server on port 3000
const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', (ws) => {
    console.log('A client connected');
    
    // Broadcast messages to all connected clients
    ws.on('message', (message) => {
        console.log('Received message: ' + message);
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('A client disconnected');
    });

    // Send a welcome message when the client connects
    ws.send('Welcome to the WebSocket server!');
});

console.log('WebSocket server is running on ws://localhost:3000');
