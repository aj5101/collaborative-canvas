

import { setupCanvas } from "./canvas.js";
import { setupWebSocket } from "./websocket.js";

const socket = setupWebSocket();
setupCanvas(socket); 



window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('draw-canvas');
  const usersList = document.getElementById('users');
  const colorPicker = document.getElementById('color');
  const brushSize = document.getElementById('size');
  const eraserBtn = document.getElementById('eraser');
  const undoBtn = document.getElementById('undo');
  const redoBtn = document.getElementById('redo');

  // Setup canvas tools
  const canvasAPI = initCanvas(canvas, colorPicker, brushSize, eraserBtn);

  // Connect WebSocket
  const socket = connectWebSocket(canvasAPI, usersList);

  // Wire undo/redo buttons
  undoBtn.addEventListener('click', () => socket.emit('undo'));
  redoBtn.addEventListener('click', () => socket.emit('redo'));
});
