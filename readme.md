# 🖌️ Real-Time Collaborative Drawing Canvas

A real-time, multi-user drawing application that enables multiple users to draw simultaneously on the same shared canvas with live synchronization using WebSockets.

---

## 📁 Project Structure

```
collaborative-canvas/
├── client/
│   ├── index.html
│   ├── style.css
│   ├── main.js
│   ├── canvas.js
│   └── websocket.js
├── server/
│   ├── server.js
│   ├── rooms.js
│   └── drawing-state.js
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/<your-username>/collaborative-canvas.git
cd collaborative-canvas
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Run the Server
```bash
npm start
```

### 4️⃣ Open in Browser
```
http://localhost:3000
```

---

## 🧪 Test with Multiple Users

1. Run the server (`npm start`).
2. Open two or more browser tabs or devices.
3. Visit `http://localhost:3000` on each.
4. Start drawing — every stroke appears live on all clients.

---

## 🧠 Architecture & Design

### 🧩 Data Flow Diagram

```
[User A Canvas] ──▶ [Socket.io Client] ──▶ [Server]
      ▲                                      │
      │                                      ▼
[User B Canvas] ◀── [Socket.io Client] ◀────┘
```

Each client sends drawing events to the server via WebSocket.  
The server rebroadcasts them to all other connected clients.

---

### 🌐 WebSocket Protocol

| Message Type | Direction | Payload Example | Description |
|---------------|------------|----------------|--------------|
| draw | client → server | `{x, y, color, width, tool}` | Sends brush stroke data |
| endPath | client → server | `{}` | Marks the end of a stroke |
| undo | client → server | `{}` | Requests undo action |
| redo | client → server | `{}` | Requests redo action |
| clearCanvas | server → client | `{}` | Clears the entire canvas |

---

### 🔄 Undo/Redo Strategy

Each stroke is recorded as a path operation in a shared history stack.  
When a user triggers undo, the server removes the last stroke from the global history and broadcasts a `clearCanvas` followed by redrawing all remaining strokes.  
Redo restores the last undone stroke.  
Conflict handling ensures that all users stay in sync with the same global state.

---

### ⚙️ Performance Optimizations

- Event throttling: Mouse events are sampled at short intervals to prevent overload.  
- Path batching: Instead of sending every pixel, grouped points are sent per stroke.  
- Lightweight canvas updates: Redraws only required paths during undo/redo.  

---

### ⚠️ Known Limitations

- Undo/Redo is global (not per-user) and may conflict if multiple users draw simultaneously.  
- No cursor indicators for other users.  
- No session persistence (canvas resets on refresh).  
- No authentication or usernames.  

---

### 🚀 Future Enhancements

- 🧠 Per-user undo/redo system  
- 💾 Persistent session storage (save/load drawings)  
- 📱 Touch-screen/mobile drawing support  
- 🎯 Real-time cursor position indicators  
- 🔐 User management (login + identity colors)  
- 🧮 Optimized server scaling for 1000+ users  

---

## 📚 Time Spent

| Task | Duration |
|------|-----------|
| Environment setup | 1 hour |
| Canvas drawing logic | 3 hours |
| WebSocket integration | 2 hours |
| Undo/Redo and testing | 2 hours |
| Documentation | 1 hour |
| **Total** | **~9 hours** |

---

## 👨‍💻 Author

**Your Name**  
📧 Email: `<your-email@example.com>`  
🌐 GitHub: [@your-username](https://github.com/your-username)

---

## 🧾 License

This project is open-source and available under the **MIT License**.
