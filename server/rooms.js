

import { DrawingState } from './drawing-state.js';

export class Room {
  constructor(name) {
    this.name = name;
    this.users = new Set();
    this.drawingState = new DrawingState();
  }

  addUser(id) {
    this.users.add(id);
  }

  removeUser(id) {
    this.users.delete(id);
  }

  getUsers() {
    return Array.from(this.users);
  }

  getDrawingState() {
    return this.drawingState;
  }
}

export class RoomManager {
  constructor() {
    this.rooms = new Map();
  }

  getRoom(name) {
    if (!this.rooms.has(name)) {
      this.rooms.set(name, new Room(name));
    }
    return this.rooms.get(name);
  }
}
