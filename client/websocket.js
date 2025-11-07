

export function setupWebSocket() {
  const socket = io(); // connects to the server automatically
  console.log("Connected to WebSocket server");
  return socket;
}
