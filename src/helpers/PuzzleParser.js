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
      grid: {
        dimensions: {
          width: null,
          height: null
        },
        cells: []
      },
      clues: {
        across: null,
        down: null
      }
    };
  }

  parsePuz(puzFile) {
    this.data.meta.copyright = puzFile.copyright;
    this.data.meta.author = puzFile.author;
    this.data.meta.title = puzFile.title;
    this.data.meta.notes = puzFile.notes;
    this.data.grid.dimensions.width = puzFile.header.width;
    this.data.grid.dimensions.height = puzFile.header.height;
    this.data.grid.cells = this.getCellsFromPuz(puzFile);
    this.data.clues = this.getCluesFromPuz(puzFile);
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
    // check if it needs an across clue
    // if in first position, or preceded by black square...
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
      // Check that there is space (at least two cells) for a word here
      if (row + 1 < height && array[index + width] !== ".") {
        returnValue = true;
      }
    }
    return returnValue;
  }
}

export default PuzzleParser;
