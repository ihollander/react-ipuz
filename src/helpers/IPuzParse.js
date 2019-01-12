export default ipuz => {
  // parse clues and solution together for cells
  const across = ipuz.clues["Across"].reduce((obj, clue) => {
    obj[clue[0]] = {
      label: clue[0],
      text: clue[1],
      answered: false,
      selected: false
    };
    return obj;
  }, {});
  const down = ipuz.clues["Down"].reduce((obj, clue) => {
    obj[clue[0]] = {
      label: clue[0],
      text: clue[1],
      answered: false,
      selected: false
    };
    return obj;
  }, {});
  const cells = [];
  const clues = {
    across,
    down
  };

  for (let i = 0; i < ipuz.solution.length; i++) {
    for (let j = 0; j < ipuz.solution[i].length; j++) {
      let cell = {};
      if (ipuz.solution[i][j] === "#") {
        cell.type = "BLACK";
      } else {
        if (typeof ipuz.puzzle[i][j] === "object") {
          cell.label = ipuz.puzzle[i][j].cell === 0 ? "" : ipuz.puzzle[i][j].cell;
          cell.style = ipuz.puzzle[i][j].style
        } else {
          cell.label = ipuz.puzzle[i][j] === 0 ? "" : ipuz.puzzle[i][j];
        }
        cell.solution = ipuz.solution[i][j];
        cell.guess = "";

        // for across clue number, look left till first black box or border
        let acrossClue = "";
        for (let col = j; col > -1 && acrossClue === ""; col--) {
          if (col - 1 < 0 || ipuz.solution[i][col - 1] === "#") {
            acrossClue = typeof ipuz.puzzle[i][col] == "object" ? ipuz.puzzle[i][col].cell : ipuz.puzzle[i][col];
          }
        }

        // for down clue number, look left till first black box or border
        let downClue = "";
        for (let row = i; row > -1 && downClue === ""; row--) {
          if (row - 1 < 0 || ipuz.solution[row - 1][j] === "#") {
            downClue = typeof ipuz.puzzle[row][j] == "object" ? ipuz.puzzle[row][j].cell : ipuz.puzzle[row][j];
          }
        }

        // add a reference (label) to clues that apply to this cell
        cell.clues = {
          across: acrossClue,
          down: downClue
        };
      }
      const index = i * ipuz.dimensions.width + j;
      cell.row = Math.floor(index / ipuz.dimensions.width);
      cell.column = index % ipuz.dimensions.width;
      cell.index = index;
      cells.push(cell);
    }
  }

  return {
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
};
