class PuzParser {
  constructor(puzFile) {
    this.data = puzFile;

    // solution grid
    this.solutionGrid = this.getSolutionGrid();

    // puzzle
    this.puzzleGrid = this.getPuzzleGrid();

    // clue list
    this.clueList = this.getClueList();
  }

  parse() {
    // clues
    const clues = {
      across: this.getClues(this.clueList["Across"]),
      down: this.getClues(this.clueList["Down"])
    };

    const cells = this.getCells();

    return {
      meta: {
        copyright: this.data.copyright,
        author: this.data.author,
        title: this.data.title,
        notes: this.data.notes
      },
      dimensions: {
        width: this.data.header.width,
        height: this.data.header.height
      },
      cells,
      clues
    };
  }

  toIPuz() {
    const result = {
      origin: "Converted from .puz",
      version: "http://ipuz.org/v2",
      kind: ["http://ipuz.org/crossword#1"],
      copyright: this.data.copyright,
      author: this.data.author,
      title: this.data.title,
      intro: this.data.notes,
      dimensions: {
        width: this.data.header.width,
        height: this.data.header.height
      },
      puzzle: this.puzzleGrid,
      clues: this.clueList,
      solution: this.solutionGrid
    };
    return JSON.stringify(result);
  }

  // helpers
  getClues(clueArray) {
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

  getCellLabel(puzzleCell) {
    if (typeof puzzleCell === "object") {
      return puzzleCell.cell === 0 ? "" : puzzleCell.cell;
    } else {
      return puzzleCell === 0 ? "" : puzzleCell;
    }
  }

  getCells() {
    const cells = [];
    for (let i = 0; i < this.solutionGrid.length; i++) {
      for (let j = 0; j < this.solutionGrid[i].length; j++) {
        let cell = {};
        const puzzleCell = this.puzzleGrid[i][j];
        const solutionCell = this.solutionGrid[i][j];
        if (solutionCell === "#") {
          cell.type = "BLACK";
        } else {
          cell.label = this.getCellLabel(puzzleCell);
          if (typeof puzzleCell === "object") cell.style = puzzleCell.style;
          cell.solution = solutionCell;
          cell.guess = "";

          // for across clue number, look left till first black box or border
          let acrossClue = "";
          for (let col = j; col > -1 && acrossClue === ""; col--) {
            if (col - 1 < 0 || this.solutionGrid[i][col - 1] === "#") {
              acrossClue = this.getCellLabel(this.puzzleGrid[i][col]);
            }
          }

          // for down clue number, look up till first black box or border
          let downClue = "";
          for (let row = i; row > -1 && downClue === ""; row--) {
            if (row - 1 < 0 || this.solutionGrid[row - 1][j] === "#") {
              downClue = this.getCellLabel(this.puzzleGrid[row][j]);
            }
          }

          // add a reference (label) to clues that apply to this cell
          cell.clues = {
            across: acrossClue,
            down: downClue
          };
        }

        cell.index = i * this.data.header.width + j;
        cell.row = Math.floor(cell.index / this.data.header.width);
        cell.column = cell.index % this.data.header.width;
        cells.push(cell);
      }
    }
    return cells;
  }

  getSolutionGrid() {
    const {
      header: { width, height },
      solution,
      extraSections
    } = this.data;

    const solutionArr = solution.split("");

    let rebusAnswers;
    if (this.data.extraSections["RTBL"]) {
      rebusAnswers = {};
      const rebusString = this.data.extraSections["RTBL"].data;
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
          if (
            rebusAnswers &&
            extraSections["GRBS"] &&
            extraSections["GRBS"].data[index] > 0
          ) {
            const rebusKey = extraSections["GRBS"].data[index] - 1;
            grid[i].push(rebusAnswers[rebusKey]);
          } else {
            grid[i].push(solutionArr[index]);
          }
        }
      }
    }

    return grid;
  }

  getPuzzleGrid() {
    const grid = this.solutionGrid;
    const {
      header: { width, height },
      extraSections
    } = this.data;

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
          // check if shape given
          if (
            extraSections["GEXT"] &&
            extraSections["GEXT"].data[index] === 128
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

  getClueList() {
    const {
      header: { width, height },
      clues
    } = this.data;
    const solutionGrid = this.getSolutionGrid();

    // loop through each cell
    const clueResult = {
      Across: [],
      Down: []
    };
    let clueIndex = 0, // starting index in stringArray for clues
      clueNumber = 1; // starting clue number

    // The clues are arranged numerically. When two clues have the same number, the Across clue comes before the Down clue.
    for (let i = 0; i < solutionGrid.length; i++) {
      for (let j = 0; j < solutionGrid[i].length; j++) {
        const needsAcross = this.cellNeedsAcrossNumber(
          solutionGrid,
          i,
          j,
          width
        );
        const needsDown = this.cellNeedsDownNumber(solutionGrid, i, j, height);
        if (needsAcross) {
          clueResult["Across"].push([clueNumber, clues[clueIndex]]);
          clueIndex++;
        }
        if (needsDown) {
          clueResult["Down"].push([clueNumber, clues[clueIndex]]);
          clueIndex++;
        }
        if (needsAcross || needsDown) {
          clueNumber++;
        }
      }
    }
    return clueResult;
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
}

export default PuzParser;
