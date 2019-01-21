class IPuzParser {
  constructor(ipuz) {
    this.data = JSON.parse(ipuz);
  }

  parse() {
    const clues = {
      across: this.getClues(this.data.clues["Across"]),
      down: this.getClues(this.data.clues["Down"])
    };

    const cells = this.getCells();

    return {
      meta: {
        copyright: this.data.copyright,
        author: this.data.author,
        title: this.data.title,
        notes: this.data.intro
      },
      dimensions: {
        width: this.data.dimensions.width,
        height: this.data.dimensions.height
      },
      cells,
      clues
    };
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

  getCells() {
    const cells = [];
    for (let i = 0; i < this.data.solution.length; i++) {
      for (let j = 0; j < this.data.solution[i].length; j++) {
        let cell = {};
        const puzzleCell = this.data.puzzle[i][j];
        const solutionCell = this.data.solution[i][j];
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
            if (col - 1 < 0 || this.data.solution[i][col - 1] === "#") {
              acrossClue = this.getCellLabel(this.data.puzzle[i][col]);
            }
          }

          // for down clue number, look left till first black box or border
          let downClue = "";
          for (let row = i; row > -1 && downClue === ""; row--) {
            if (row - 1 < 0 || this.data.solution[row - 1][j] === "#") {
              downClue = this.getCellLabel(this.data.puzzle[row][j]);
            }
          }

          // add a reference (label) to clues that apply to this cell
          cell.clues = {
            across: acrossClue,
            down: downClue
          };
        }

        cell.index = i * this.data.dimensions.width + j;
        cell.row = Math.floor(cell.index / this.data.dimensions.width);
        cell.column = cell.index % this.data.dimensions.width;
        cells.push(cell);
      }
    }
    return cells;
  }

  getCellLabel(puzzleCell) {
    if (typeof puzzleCell === "object") {
      return puzzleCell.cell === 0 ? "" : puzzleCell.cell;
    } else {
      return puzzleCell === 0 ? "" : puzzleCell;
    }
  }
}

export default IPuzParser;
