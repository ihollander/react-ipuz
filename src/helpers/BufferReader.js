class BufferReader {
  constructor(data) {
    this.data = new Uint8Array(data);
    this.position = 0x00;
  }

  // sets buffer position
  seekTo(position) {
    this.position = position;
  }

  // returns buffer from current position to new position
  readTo(offset) {
    const buffer = this.data.slice(this.position, this.position + offset);
    this.position += offset;
    return buffer;
  }

  readByte() {
    const offset = 0x1;
    const buffer = this.readTo(offset);
    return this.toNum(buffer)
  }

  readShort() {
    const offset = 0x2;
    const buffer = this.readTo(offset);
    return this.toNum(buffer)
  }

  readInt() {
    const offset = 0x4;
    const buffer = this.readTo(offset);
    return this.toNum(buffer)
  }

  // read from current position to next null terminator
  readString() {
    const offset = this.data.slice(this.position).indexOf(0x00);
    const buffer = this.readTo(offset);
    this.position += 1 // skip null terminator
    return this.toString(buffer);
  }

  toNum(buffer) {
    let value = 0;
    for (let i = buffer.length - 1; i >= 0; i--) {
      value = value * 256 + buffer[i];
    }
    return value;
  }

  toString(buffer) {
    return String.fromCharCode.apply(null, buffer);
  }
}

export default BufferReader