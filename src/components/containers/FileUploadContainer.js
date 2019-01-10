import React from "react";
import { connect } from "react-redux";
import { parseActions } from "../../actions/parse";
import PuzParse from '../../helpers/PuzParse'

// https://www.nytimes.com/svc/crosswords/v2/puzzle/daily-2019-01-10.puz

class FileUploadContainer extends React.Component {
  onFileUpload = e => {
    this.props.parsing()
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = e => { // after the file is read
      // send data to puzparser
      const xword = new PuzParse(e.target.result)
      const ipuz = xword.toIPuz()
      const ipuzObj = JSON.parse(ipuz)
      this.props.parseIpuz(ipuzObj)
    }
    reader.readAsArrayBuffer(file)
  }

  render() {
    return <input type="file" onChange={this.onFileUpload} />;
  }
}

export default connect(null,{
  parseIpuz: parseActions.parseIpuz,
  parsing: parseActions.parsing
})(FileUploadContainer);
