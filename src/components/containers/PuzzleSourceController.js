import React from "react";

import FileUploadController from "./FileUploadContainer";

class PuzzleSourceController extends React.Component {
  render() {
    return (
      <>
        <FileUploadController />
        <div>PuzzleSources</div>
      </>
    );
  }
}

export default PuzzleSourceController;
