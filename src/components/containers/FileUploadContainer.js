import React from "react";
import { connect } from "react-redux";
import { parsing, parseFile } from "../../actions/puzzle";

import { createGame } from "../../actions/game";

import PuzReader from "../../helpers/puzFile/PuzReader";
import PuzzleParser from "../../helpers/PuzzleParser";

class FileUploadContainer extends React.Component {
  
  parseBuffer = buffer => {
    const puzFile = new PuzReader(buffer);
    const parser = new PuzzleParser();
    parser.parsePuz(puzFile);
    const gameObj = {
      game: {
        title: parser.data.meta.title,
        puzzle: JSON.stringify(parser.data),
        timer: 0,
        solved: 0,
        active: true
      }
    };
    return gameObj;
  };

  onFileUpload = e => {
    this.props.parsing()
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = e => {
      const gameObj = this.parseBuffer(e.target.result)
      this.props.createGame(gameObj)
    }
    reader.readAsArrayBuffer(file)
  }

  render() {
    return <input type="file" onChange={this.onFileUpload} />;
  }
}

export default connect(null,{
  parseFile,
  parsing,
  createGame
})(FileUploadContainer);
