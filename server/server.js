

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import { DrawingState } from './drawing-state.js';
import { RoomManager } from './rooms.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Serve static client files
app.use(express.static(path.join(__dirname, '../client')));

const roomManager = new RoomManager();

// When a new user connects
io.on('connection', (socket) => {
  const userId = socket.id;
  console.log('🟢 New connection:', userId);

  // Default room = 'main'
  const room = roomManager.getRoom('main');
  room.addUser(userId);

  // Broadcast online users
  io.emit('users', room.getUsers());

  // Send initial state
  socket.emit('init', room.getDrawingState().getOperations());

  // Handle drawing events
  socket.on('draw', (data) => {
    room.getDrawingState().addOperation(data);
    socket.broadcast.emit('draw', data);
  });

  // Handle undo/redo
  socket.on('undo', () => {
    const op = room.getDrawingState().undo();
    io.emit('undo', op);
  });

  socket.on('redo', () => {
    const op = room.getDrawingState().redo();
    io.emit('redo', op);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('🔴 Disconnected:', userId);
    room.removeUser(userId);
    io.emit('users', room.getUsers());
  });
});

// Start server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
