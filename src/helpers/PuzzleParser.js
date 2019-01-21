class PuzzleParser {
  constructor() {
    // set initial shape for data
    this.data = {
      meta: {
        copyright: "",
        author: "",
        title: "",
        notes: ""
      },
      dimensions: {
        width: null,
        height: null
      },
      cells: [],
      clues: {
        across: null,
        down: null
      }
    };
  }

  parseState(state) {
    this.data.meta = state.meta;
    this.data.dimensions = state.dimensions;
    this.data.cells = state.cells;
    this.data.clues = state.clues;
  }

  parsePuz(puzFile) {
    this.data.meta.copyright = puzFile.copyright;
    this.data.meta.author = puzFile.author;
    this.data.meta.title = puzFile.title;
    this.data.meta.notes = puzFile.notes;
    this.data.dimensions.width = puzFile.header.width;
    this.data.dimensions.height = puzFile.header.height;
    this.data.cells = this.getCellsFromPuz(puzFile);
    this.data.clues = this.getCluesFromPuz(puzFile);
  }

  parseIpuz(ipuzFile) {
    const ipuz = JSON.parse(ipuzFile);
    this.data.meta.copyright = ipuz.copyright;
    this.data.meta.author = ipuz.author;
    this.data.meta.title = ipuz.title;
    this.data.meta.notes = ipuz.intro;
    this.data.dimensions.width = ipuz.dimensions.width;
    this.data.dimensions.height = ipuz.dimensions.height;
    this.data.cells = this.getCellsFromIpuz(ipuz);
    this.data.clues.across = this.getCluesFromIpuz(ipuz.clues["Across"]);
    this.data.clues.down = this.getCluesFromIpuz(ipuz.clues["Down"]);
  }

  convertToIpuz() {
    const result = {
      origin: "Converted from .puz",
      version: "http://ipuz.org/v2",
      kind: ["http://ipuz.org/crossword#1"],
      copyright: this.data.meta.copyright,
      author: this.data.meta.author,
      title: this.data.meta.title,
      intro: this.data.meta.notes,
      dimensions: {
        width: this.data.dimensions.width,
        height: this.data.dimensions.height
      },
      puzzle: this.toIpuzPuzzle(),
      clues: this.toIpuzClues(),
      solution: this.toIpuzSolution()
    };
    
    return JSON.stringify(result);
  }

  toIpuzClues() {
    const across = Object.keys(this.data.clues.across).map(key => [
      parseInt(key),
      this.data.clues.across[key].text
    ]);
    const down = Object.keys(this.data.clues.down).map(key => [
      parseInt(key),
      this.data.clues.down[key].text
    ]);
    return {
      Across: across,
      Down: down
    };
  }

  toIpuzSolution() {
    // convert cell values to 2D grid
    const grid = [];
    const { width, height } = this.data.dimensions;

    for (let row = 0; row < height; row++) {
      grid[row] = [];
      for (let column = 0; column < width; column++) {
        const cell = this.data.cells.find(
          c => c.row === row && c.column === column
        );
        if (cell.type === "BLACK") {
          grid[row].push("#");
        } else {
          grid[row].push(cell.solution);
        }
      }
    }

    return grid;
  }

  toIpuzPuzzle() {
    // convert cell values to 2D grid
    const grid = [];
    const { width, height } = this.data.dimensions;

    for (let row = 0; row < height; row++) {
      grid[row] = [];
      for (let column = 0; column < width; column++) {
        const cell = this.data.cells.find(
          c => c.row === row && c.column === column
        );
        if (cell.type === "BLACK") {
          grid[row].push("#");
        } else {
          const cellLabel = cell.label === "" ? 0 : cell.label;
          if (typeof cell.style === "object") {
            const cellValue = {
              cell: cellLabel,
              style: {
                shapebg: "circle"
              }
            };
            grid[row].push(cellValue);
          } else {
            grid[row].push(cellLabel);
          }
        }
      }
    }

    return grid;
  }

  // puz file helpers
  getCellsFromPuz(puzFile) {
    const {
      header: { width, height },
      solution,
      extraSections
    } = puzFile;

    const solutionArray = solution.split("");
    let currentClue = 1;

    let rebusAnswers;
    if (extraSections["RTBL"]) {
      rebusAnswers = {};
      const rebusString = extraSections["RTBL"].data;
      rebusString.split(";").forEach(str => {
        if (str !== "") {
          let splitStr = str.split(":");
          let key = splitStr[0].trim();
          rebusAnswers[key] = splitStr[1];
        }
      });
    }

    const cells = [];
    for (let index = 0; index < solutionArray.length; index++) {
      const cell = {};
      cell.index = index;
      cell.row = Math.floor(index / puzFile.header.width);
      cell.column = index % puzFile.header.width;

      if (solutionArray[index] === ".") {
        // not solvable
        cell.type = "BLACK";
      } else {
        // solvable
        if (
          rebusAnswers &&
          extraSections["GRBS"] &&
          extraSections["GRBS"].data[index] > 0
        ) {
          const rebusKey = extraSections["GRBS"].data[index] - 1;
          cell.solution = rebusAnswers[rebusKey];
        } else {
          cell.solution = solutionArray[index];
        }

        // get label
        const needsAcrossLabel = this.needsAcrossNumber(
          solutionArray,
          index,
          cell.column,
          width
        );
        const needsDownLabel = this.needsDownNumber(
          solutionArray,
          index,
          cell.row,
          width,
          height
        );
        if (needsAcrossLabel || needsDownLabel) {
          cell.label = currentClue;
          currentClue++;
        } else {
          cell.label = "";
        }

        cell.guess = "";

        // for across clue number, look left till first black box or border
        let acrossClue = "";
        for (
          let column = cell.column;
          column > -1 && acrossClue === "";
          column--
        ) {
          let indexToCheck = cell.row * width + column;
          if (column - 1 < 0 || cells[indexToCheck - 1].type === "BLACK") {
            acrossClue =
              index === indexToCheck ? cell.label : cells[indexToCheck].label;
          }
        }

        // for down clue number, look up till first black box or border
        let downClue = "";
        for (let row = cell.row; row > -1 && downClue === ""; row--) {
          let indexToCheck = row * width + cell.column;
          if (row - 1 < 0 || cells[indexToCheck - width].type === "BLACK") {
            downClue =
              index === indexToCheck ? cell.label : cells[indexToCheck].label;
          }
        }

        // add a reference (label) to clues that apply to this cell
        cell.clues = {
          across: acrossClue,
          down: downClue
        };

        // check if shape given
        if (
          extraSections["GEXT"] &&
          extraSections["GEXT"].data[index] === 128
        ) {
          cell.style = { shapebg: "circle" };
        }
      }

      cells.push(cell);
    }

    return cells;
  }

  getCluesFromPuz(puzFile) {
    const {
      header: { width, height },
      clues,
      solution
    } = puzFile;

    const solutionArray = solution.split("");

    const result = {
      across: {},
      down: {}
    };

    let clueIndex = 0, // starting index in stringArray for clues
      clueNumber = 1; // starting clue number

    // The clues are arranged numerically. When two clues have the same number, the Across clue comes before the Down clue.
    for (let index = 0; index < solutionArray.length; index++) {
      const row = Math.floor(index / puzFile.header.width);
      const column = index % puzFile.header.width;

      const needsAcrossClue = this.needsAcrossNumber(
        solutionArray,
        index,
        column,
        width
      );
      const needsDownClue = this.needsDownNumber(
        solutionArray,
        index,
        row,
        width,
        height
      );
      if (needsAcrossClue) {
        result.across[clueNumber] = {
          label: clueNumber,
          text: clues[clueIndex],
          answered: false,
          selected: false
        };
        clueIndex++;
      }
      if (needsDownClue) {
        result.down[clueNumber] = {
          label: clueNumber,
          text: clues[clueIndex],
          answered: false,
          selected: false
        };
        clueIndex++;
      }
      if (needsAcrossClue || needsDownClue) {
        clueNumber++;
      }
    }

    return result;
  }

  needsAcrossNumber(array, index, column, width) {
    let returnValue = false;
    // if in first position, or preceded by black square
    if (array[index] !== "." && (column === 0 || array[index - 1] === ".")) {
      // Check that there is space (at least two cells) for a word here
      if (column + 1 < width && array[index + 1] !== ".") {
        returnValue = true;
      }
    }
    return returnValue;
  }

  needsDownNumber(array, index, row, width, height) {
    let returnValue = false;
    if (array[index] !== "." && (row === 0 || array[index - width] === ".")) {
      if (row + 1 < height && array[index + width] !== ".") {
        returnValue = true;
      }
    }
    return returnValue;
  }

  // ipuz file helpers
  getCluesFromIpuz(clueArray) {
    return clueArray.reduce((obj, clue) => {
      obj[clue[0]] = {
        label: clue[0],
        text: clue[1],
        answered: false,
        selected: false
      };
      return obj;
    }, {});
  }

  getCellsFromIpuz(ipuz) {
    const cells = [];
    for (let i = 0; i < ipuz.solution.length; i++) {
      for (let j = 0; j < ipuz.solution[i].length; j++) {
        let cell = {};
        const puzzleCell = ipuz.puzzle[i][j];
        const solutionCell = ipuz.solution[i][j];
        if (solutionCell === "#") {
          cell.type = "BLACK";
        } else {
          cell.label = this.getIpuzCellLabel(puzzleCell);
          if (typeof puzzleCell === "object") cell.style = puzzleCell.style;
          cell.solution = solutionCell;
          cell.guess = "";

          // for across clue number, look left till first black box or border
          let acrossClue = "";
          for (let col = j; col > -1 && acrossClue === ""; col--) {
            if (col - 1 < 0 || ipuz.solution[i][col - 1] === "#") {
              acrossClue = this.getIpuzCellLabel(ipuz.puzzle[i][col]);
            }
          }

          // for down clue number, look left till first black box or border
          let downClue = "";
          for (let row = i; row > -1 && downClue === ""; row--) {
            if (row - 1 < 0 || ipuz.solution[row - 1][j] === "#") {
              downClue = this.getIpuzCellLabel(ipuz.puzzle[row][j]);
            }
          }

          // add a reference (label) to clues that apply to this cell
          cell.clues = {
            across: acrossClue,
            down: downClue
          };
        }

        cell.index = i * ipuz.dimensions.width + j;
        cell.row = Math.floor(cell.index / ipuz.dimensions.width);
        cell.column = cell.index % ipuz.dimensions.width;
        cells.push(cell);
      }
    }
    return cells;
  }

  getIpuzCellLabel(puzzleCell) {
    if (typeof puzzleCell === "object") {
      return puzzleCell.cell === 0 ? "" : puzzleCell.cell;
    } else {
      return puzzleCell === 0 ? "" : puzzleCell;
    }
  }
}

export default PuzzleParser;
