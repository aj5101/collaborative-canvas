
export function setupCanvas(socket) {
  const canvas = document.getElementById("drawingCanvas");
  const ctx = canvas.getContext("2d");

  // Resize canvas to fit window
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 100;

  // Brush state
  let drawing = false;
  let tool = "brush"; // 'brush' or 'eraser'
  let strokeColor = document.getElementById("colorPicker").value;
  let strokeWidth = document.getElementById("strokeWidth").value;

  // Event listeners
  document.getElementById("colorPicker").addEventListener("input", (e) => {
    strokeColor = e.target.value;
  });

  document.getElementById("strokeWidth").addEventListener("input", (e) => {
    strokeWidth = e.target.value;
  });

  document.getElementById("brushTool").addEventListener("click", () => {
    tool = "brush";
  });

  document.getElementById("eraserTool").addEventListener("click", () => {
    tool = "eraser";
  });

  document.getElementById("undoBtn").addEventListener("click", () => {
    socket.emit("undo");
  });

  document.getElementById("redoBtn").addEventListener("click", () => {
    socket.emit("redo");
  });

  // Start drawing
  canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    const pos = getMousePos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  });

  // Drawing movement
  canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;
    const pos = getMousePos(e, canvas);
    drawLine(ctx, pos.x, pos.y, strokeColor, strokeWidth, tool);

    // Broadcast to others
    socket.emit("draw", {
      x: pos.x,
      y: pos.y,
      color: strokeColor,
      width: strokeWidth,
      tool: tool,
    });
  });

  // Stop drawing
  canvas.addEventListener("mouseup", () => {
    drawing = false;
    socket.emit("endPath");
  });

  canvas.addEventListener("mouseleave", () => {
    drawing = false;
  });

  // Listen for drawing data from others
  socket.on("draw", (data) => {
    drawLine(ctx, data.x, data.y, data.color, data.width, data.tool);
  });

  socket.on("clearCanvas", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
}

// Helper Functions
function drawLine(ctx, x, y, color, width, tool) {
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.strokeStyle = tool === "eraser" ? "#FFFFFF" : color;
  ctx.lineTo(x, y);
  ctx.stroke();
}

function getMousePos(evt, canvas) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}
