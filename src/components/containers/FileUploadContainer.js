import React from "react";
import { connect } from "react-redux";
import { puzzleActions } from "../../actions/puzzle";

class FileUploadContainer extends React.Component {
  onFileUpload = e => {
    this.props.parsing()
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = e => { // after the file is read
      this.props.parseFile(e.target.result)
    }
    reader.readAsArrayBuffer(file)
  }

  render() {
    return <input type="file" onChange={this.onFileUpload} />;
  }
}

export default connect(null,{
  parseFile: puzzleActions.parseFile,
  parsing: puzzleActions.parsing
})(FileUploadContainer);
