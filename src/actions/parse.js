import { parseTypes } from "../actionTypes/parse";

const parseIpuz = ipuz => {
  // parse clues and solution together for cells
  const cells = [];
  const clues = {
    across: ipuz.clues["Across"].map((clue, index) => ({
      label: clue[0],
      text: clue[1],
      index
    })),
    down: ipuz.clues["Down"].map((clue, index) => ({
      label: clue[0],
      text: clue[1],
      index
    }))
  };

  for (let i = 0; i < ipuz.solution.length; i++) {
    for (let j = 0; j < ipuz.solution.length; j++) {
      let cell = {};
      if (ipuz.solution[i][j] === "#") {
        cell.type = "BLACK";
      } else {
        cell.label = ipuz.puzzle[i][j] === 0 ? "" : ipuz.puzzle[i][j];
        cell.solution = ipuz.solution[i][j];
        cell.guess = "";

        // for across clue number, look left till first black box or border
        let acrossClue = "";
        for (let col = j; col > -1 && acrossClue === ""; col--) {
          if (col - 1 < 0 || ipuz.solution[i][col - 1] === "#") {
            acrossClue = ipuz.puzzle[i][col];
          }
        }

        // for down clue number, look left till first black box or border
        let downClue = "";
        for (let row = i; row > -1 && downClue === ""; row--) {
          if (row - 1 < 0 || ipuz.solution[row - 1][j] === "#") {
            downClue = ipuz.puzzle[row][j];
          }
        }

        // add a reference to clues that apply to this cell
        cell.clues = {
          across: acrossClue,
          down: downClue
        };
      }
      const index = i * ipuz.dimensions.height + j;
      cell.row = Math.floor(index / ipuz.dimensions.height);
      cell.column = index % ipuz.dimensions.width;
      cell.index = i * ipuz.dimensions.height + j;
      cells.push(cell);
    }
  }

  const puzzleObj = {
    meta: {
      copyright: ipuz.copyright,
      author: ipuz.author,
      title: ipuz.title
    },
    grid: {
      dimensions: {
        width: ipuz.dimensions.width,
        height: ipuz.dimensions.height
      },
      cells
    },
    clues
  };

  console.log(puzzleObj);
  return {
    type: parseTypes.PUZZLE_PARSED,
    payload: puzzleObj
  };
};

export const parseActions = {
  parseIpuz
};
