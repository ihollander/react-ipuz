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
    const puzzleBuffer = new PuzzleBuffer(data);
    this.data = puzMap.reduce((obj, item) => {
      let buffer = puzzleBuffer.readTo(item.length);
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
    const HEADER_END = 0x34;
    puzzleBuffer.seekTo(HEADER_END);

    let buffer = puzzleBuffer.readTo(gridSize);
    this.data.solution = this.toInt8String(buffer);

    // state
    // Next comes the player state, stored similarly.
    // Empty cells are stored as '-'.
    buffer = puzzleBuffer.readTo(gridSize);
    this.data.state = this.toInt8String(buffer);

    // Immediately following the boards comes the strings.
    // All strings are encoded in ISO-8859-1 and end with a NUL.
    // Even if a string is empty, its trailing NUL still appears in the file.
    this.title = puzzleBuffer.readString();
    this.author = puzzleBuffer.readString();
    this.copyright = puzzleBuffer.readString();

    // clues
    this.data.clues = [];
    while (this.data.clues.length < this.data.numberOfClues) {
      this.data.clues.push(puzzleBuffer.readString());
    }

    // moarrrr
    this.data.notes = puzzleBuffer.readString();

    // extra sections
    this.data.extraSections = {};

    // title 0x4
    // length 0x2
    // checksum 0x2
    // data [length]

    while (puzzleBuffer.data.length > puzzleBuffer.position) {
      let extraSection = {};
      buffer = puzzleBuffer.readTo(0x4);
      let title = this.toInt8String(buffer);
      extraSection.length = puzzleBuffer.readShort();
      extraSection.checksum = puzzleBuffer.readShort();
      extraSection.data = puzzleBuffer.readTo(extraSection.length);
      // extra section has a null terminator...
      // puzzleBuffer.position += 1;
      this.data.extraSections[title] = extraSection;

      // move to next null terminator
      let nextPosition = puzzleBuffer.data
        .slice(puzzleBuffer.position)
        .findIndex(c => c !== 0x00);
      if (nextPosition > 0) {
        puzzleBuffer.position += nextPosition;
      }
    }

    // solution grid
    this.solutionGrid = this.getSolutionGrid();

    // puzzle
    this.puzzleGrid = this.getPuzzleGrid();

    // clue list
    this.clueList = this.getClueList();
  }

  toIPuz() {
    const result = {
      origin: "Converted from .puz",
      version: "http://ipuz.org/v2",
      kind: ["http://ipuz.org/crossword#1"],
      copyright: this.copyright,
      author: this.author,
      title: this.title,
      intro: this.data.notes,
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

  getPuzzleGrid() {
    const grid = this.solutionGrid;
    const { width, height, extraSections } = this.data;

    let puzzleGrid = [],
      clueNumber = 1; // starting clue number

    // The clues are arranged numerically. When two clues have the same number, the Across clue comes before the Down clue.
    for (let i = 0; i < grid.length; i++) {
      puzzleGrid[i] = [];
      for (let j = 0; j < grid[i].length; j++) {
        // for black squares, return "#"
        if (grid[i][j] === "#") {
          puzzleGrid[i][j] = "#";
        } else {
          const index = i * width + j;
          const needsAcross = this.cellNeedsAcrossNumber(grid, i, j, width);
          const needsDown = this.cellNeedsDownNumber(grid, i, j, height);
          let cellValue = 0;
          if (needsAcross || needsDown) {
            cellValue = clueNumber;
            clueNumber++;
          }
          // check if shape
          if (
            extraSections["GEXT"] &&
            extraSections["GEXT"].data[index] === 0x80
          ) {
            puzzleGrid[i][j] = {
              cell: cellValue,
              style: { shapebg: "circle" }
            };
          } else {
            puzzleGrid[i][j] = cellValue;
          }
        }
      }
    }
    return puzzleGrid;
  }

  getSolutionGrid() {
    const { width, height, solution, extraSections } = this.data;
    const solutionArr = solution.split("");
    let rebusAnswers;
    if (this.data.extraSections["RTBL"]) {
      rebusAnswers = {};
      let rebusString = String.fromCharCode.apply(
        null,
        new Uint8Array(this.data.extraSections["RTBL"].data)
      );
      rebusString.split(";").forEach(str => {
        if (str !== "") {
          let splitStr = str.split(":");
          let key = splitStr[0].trim();
          rebusAnswers[key] = splitStr[1];
        }
      });
    }

    const grid = [];
    for (let i = 0; i < height; i++) {
      grid[i] = [];
      for (let j = 0; j < width; j++) {
        const index = i * width + j;
        if (solutionArr[index] === ".") {
          grid[i].push("#");
        } else {
          if (rebusAnswers && extraSections["GRBS"].data[index] > 0x00) {
            let buffer = extraSections["GRBS"].data.slice(index, index + 0x01);
            let rebusKey = new Uint8Array(buffer)[0] - 1;
            grid[i].push(rebusAnswers[rebusKey]);
          } else {
            grid[i].push(solutionArr[index]);
          }
        }
      }
    }

    return grid;
  }

  getClueList() {
    const { width, height } = this.data;
    const stringArray = this.data.clues;
    const solutionGrid = this.getSolutionGrid();

    // loop through each cell
    let clues = {
      Across: [],
      Down: []
    };
    let clueIndex = 0, // starting index in stringArray for clues
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
    return arrayBuffer[0];
  }

  toShort(arrayBuffer) {
    let value = 0;
    for (let i = arrayBuffer.length - 1; i >= 0; i--) {
      value = value * 256 + arrayBuffer[i];
    }
    return value;
  }

  toInt8String(arrayBuffer) {
    return String.fromCharCode.apply(null, arrayBuffer);
  }
}

class PuzzleBuffer {
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
    return buffer[0];
  }

  readShort() {
    const offset = 0x2;
    const buffer = this.readTo(offset);
    let value = 0;
    for (let i = buffer.length - 1; i >= 0; i--) {
      value = value * 256 + buffer[i];
    }
    return value;
  }

  // read from current position to next NUL
  readString() {
    const offset = this.data.slice(this.position).indexOf(0x00) + 1;
    const buffer = this.readTo(offset);
    return String.fromCharCode.apply(null, buffer);
  }
}

export default PuzParse;
