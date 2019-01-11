// reference: https://code.google.com/archive/p/puz/wikis/FileFormat.wiki
const puzMap = [
  {
    name: "checksum", // Checksum | 0x00 | 0x01 | 0x2 | short | overall file checksum
    start: 0x00,
    length: 0x02,
    type: "short"
  },
  {
    name: "fileMagic", // File Magic | 0x02 | 0x0D | 0xC | string | NUL-terminated constant string: 4143 524f 5353 2644 4f57 4e00 ("ACROSS&DOWN")
    start: 0x02,
    length: 0xc,
    type: "string"
  },
  {
    name: "cibChecksum", // CIB Checksum | 0x0E | 0x0F | 0x2 | short | (defined later)
    start: 0x0e,
    length: 0x2,
    type: "short"
  },
  {
    name: "maskedLowChecksums", // Masked Low Checksums | 0x10 | 0x13 | 0x4 | | A set of checksums, XOR-masked against a magic string.
    start: 0x10,
    length: 0x4,
    type: "string"
  },
  {
    name: "maskedHighChecksums", // Masked High Checksums | 0x14 | 0x17 | 0x4 | | A set of checksums, XOR-masked against a magic string.
    start: 0x14,
    length: 0x4,
    type: "string"
  },
  {
    name: "versionString", // Version String(?) | 0x18 | 0x1B | 0x4 | string | e.g. "1.2\0"
    start: 0x18,
    length: 0x4,
    type: "string"
  },
  {
    name: "reserved1C", // Reserved1C(?) | 0x1C | 0x1D | 0x2 | ? | In many files, this is uninitialized memory
    start: 0x1c,
    length: 0x2,
    type: "short"
  },
  {
    name: "scrambledChecksum", // Scrambled Checksum | 0x1E | 0x1F | 0x2 | short | In scrambled puzzles, a checksum of the real solution (details below). Otherwise, 0x0000.
    start: 0x1e,
    length: 0x2,
    type: "short"
  },
  {
    name: "reserved20", // Reserved20(?) | 0x20 | 0x2B | 0xC | ? | In files where Reserved1C is garbage, this is garbage too.
    start: 0x20,
    length: 0xc,
    type: "string"
  },
  {
    name: "width", // Width | 0x2C | 0x2C | 0x1 | byte | The width of the board
    start: 0x2c,
    length: 0x1,
    type: "byte"
  },
  {
    name: "height", // Height | 0x2D | 0x2D | 0x1 | byte | The height of the board
    start: 0x2d,
    length: 0x1,
    type: "byte"
  },
  {
    name: "numberOfClues", // # of Clues | 0x2E | 0x2F | 0x2 | short | The number of clues for this board
    start: 0x2e,
    length: 0x2,
    type: "short"
  },
  {
    name: "unknownBitmask", // Unknown Bitmask | 0x30 | 0x31 | 0x2 | short | A bitmask. Operations unknown.
    start: 0x30,
    length: 0x2,
    type: "short"
  },
  {
    name: "scrambledTag", // Scrambled Tag | 0x32 | 0x33 | 0x2 | short | 0 for unscrambled puzzles. Nonzero (often 4) for scrambled puzzles.
    start: 0x32,
    length: 0x2,
    type: "short"
  }
];

class PuzParse {
  constructor(data) {
    this.data = puzMap.reduce((obj, item) => {
      let buffer = this.getArrayBuffer(data, item.start, item.length);
      let parsedValue;
      switch (item.type) {
        case "short":
          parsedValue = this.toShort(buffer);
          break;
        case "string":
          parsedValue = this.toInt8String(buffer);
          break;
        case "byte":
          parsedValue = this.toByte(buffer);
          break;
        default:
          parsedValue = this.toByte(buffer);
          break;
      }
      obj[item.name] = parsedValue;
      return obj;
    }, {});

    // dynamic values
    const gridSize = this.data.height * this.data.width;

    // solution
    // At the end of the header (offset 0x34) comes the solution to the puzzle.
    // Non-playable (ie: black) cells are denoted by '.'.
    let nextStart = 0x34;
    let buffer = this.getArrayBuffer(data, nextStart, gridSize);
    this.data.solution = this.toInt8String(buffer);

    // state
    // Next comes the player state, stored similarly.
    // Empty cells are stored as '-'.
    nextStart += gridSize;
    buffer = this.getArrayBuffer(data, nextStart, gridSize);
    this.data.state = this.toInt8String(buffer);

    // Immediately following the boards comes the strings.
    // All strings are encoded in ISO-8859-1 and end with a NUL.
    // Even if a string is empty, its trailing NUL still appears in the file.
    nextStart += gridSize;
    buffer = data.slice(nextStart);
    const int8array = new Int8Array(buffer);

    // split on nulls
    let splitBuffer = [],
      start = 0;

    for (let i = 0; i < int8array.length; i++) {
      if (int8array[i] === 0x00) {
        splitBuffer.push(buffer.slice(start, i));
        start = i + 1;
      }
    }

    this.data.strings = splitBuffer.map(buff => this.toInt8String(buff));
  }

  toIPuz() {
    const result = {
      origin: "Converted from .puz",
      version: "http://ipuz.org/v2",
      kind: ["http://ipuz.org/crossword#1"],
      copyright: this.copyright,
      author: this.author,
      title: this.title,
      dimensions: {
        width: this.data.width,
        height: this.data.height
      },
      puzzle: this.puzzleGrid,
      clues: this.clueList,
      solution: this.solutionGrid
    };
    return JSON.stringify(result);
  }

  get gridSize() {
    return this.data.width * this.data.height;
  }

  get title() {
    const stringArray = this.data.strings;
    return stringArray[0];
  }

  get author() {
    const stringArray = this.data.strings;
    return stringArray[1];
  }

  get copyright() {
    const stringArray = this.data.strings;
    return stringArray[2];
  }

  get puzzleGrid() {
    const solutionGrid = this.solutionGrid;
    const width = this.data.width;
    const height = this.data.height;
    // loop through each cell

    let puzzleGrid = [],
      clueNumber = 1; // starting clue number

    // The clues are arranged numerically. When two clues have the same number, the Across clue comes before the Down clue.
    for (let i = 0; i < solutionGrid.length; i++) {
      puzzleGrid[i] = [];
      for (let j = 0; j < solutionGrid[i].length; j++) {
        // if blank, return "#"
        if (solutionGrid[i][j] === "#") {
          puzzleGrid[i][j] = "#";
        } else {
          // check if clue labeled
          let needsAcross = this.cellNeedsAcrossNumber(
            solutionGrid,
            i,
            j,
            width
          );
          let needsDown = this.cellNeedsDownNumber(solutionGrid, i, j, height);
          if (needsAcross || needsDown) {
            puzzleGrid[i][j] = clueNumber;
            clueNumber++;
          } else {
            puzzleGrid[i][j] = 0;
          }
        }
      }
    }
    return puzzleGrid;
  }

  get solutionGrid() {
    const solutionString = this.data.solution;
    const solutionArr = solutionString.split("");

    const grid = [];
    const height = this.data.height;
    const width = this.data.width;
    for (let i = 0; i < height; i++) {
      grid[i] = [];
      for (let j = 0; j < width; j++) {
        if (solutionArr[i * width + j] === ".") {
          grid[i].push("#")
        } else {
          grid[i].push(solutionArr[i * width + j]);
        }
      }
    }

    return grid;
  }

  get clueList() {
    const stringArray = this.data.strings;
    const solutionGrid = this.solutionGrid;
    const width = this.data.width;
    const height = this.data.height;
    // loop through each cell
    let clues = {
      Across: [],
      Down: []
    };
    let clueIndex = 3, // starting index in stringArray for clues
      clueNumber = 1; // starting clue number

    // The clues are arranged numerically. When two clues have the same number, the Across clue comes before the Down clue.
    for (let i = 0; i < solutionGrid.length; i++) {
      for (let j = 0; j < solutionGrid[i].length; j++) {
        let needsAcross = this.cellNeedsAcrossNumber(solutionGrid, i, j, width);
        if (needsAcross) {
          clues["Across"].push([clueNumber, stringArray[clueIndex]]);
          clueIndex++;
        }
        let needsDown = this.cellNeedsDownNumber(solutionGrid, i, j, height);
        if (needsDown) {
          clues["Down"].push([clueNumber, stringArray[clueIndex]]);
          clueIndex++;
        }
        if (needsAcross || needsDown) {
          clueNumber++;
        }
      }
    }
    return clues;
  }

  cellNeedsAcrossNumber(solutionGrid, y, x, width) {
    let returnValue = false;
    // check if it needs an across clue
    // if in first position, or preceded by black square...
    if (
      solutionGrid[y][x] !== "#" &&
      (x === 0 || solutionGrid[y][x - 1] === "#")
    ) {
      // Check that there is space (at least two cells) for a word here
      if (x + 1 < width && solutionGrid[y][x + 1] !== "#") {
        returnValue = true;
      }
    }
    return returnValue;
  }

  cellNeedsDownNumber(solutionGrid, y, x, height) {
    let returnValue = false;
    // check if it needs an across clue
    // if in first position, or preceded by black square...
    if (
      solutionGrid[y][x] !== "#" &&
      (y === 0 || solutionGrid[y - 1][x] === "#")
    ) {
      // Check that there is space (at least two cells) for a word here
      if (y + 1 < height && solutionGrid[y + 1][x] !== "#") {
        returnValue = true;
      }
    }
    return returnValue;
  }

  toByte(arrayBuffer) {
    return new Uint8Array(arrayBuffer)[0];
  }

  toShort(arrayBuffer) {
    return new Uint16Array(arrayBuffer)[0];
  }

  toInt8String(arrayBuffer) {
    return String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));
  }

  getArrayBuffer(data, start, offset) {
    return data.slice(start, start + offset);
  }
}

export default PuzParse;
