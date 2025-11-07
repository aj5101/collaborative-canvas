

export class DrawingState {
  constructor() {
    this.operations = [];
    this.undone = [];
  }

  addOperation(op) {
    this.operations.push(op);
    this.undone = []; // clear redo stack
  }

  undo() {
    if (this.operations.length === 0) return null;
    const op = this.operations.pop();
    this.undone.push(op);
    return op;
  }

  redo() {
    if (this.undone.length === 0) return null;
    const op = this.undone.pop();
    this.operations.push(op);
    return op;
  }

  getOperations() {
    return this.operations;
  }
}
