import React from "react";
import { List, Ref } from "semantic-ui-react";

class ClueItem extends React.Component {
  liRef = React.createRef();

  componentDidUpdate() {
    const { selected } = this.props;
    const target = this.liRef.current;
    if (selected && target) {
      // clearInterval(this.scrollInterval) // clear existing animations...
      // this.animateScroll(target, 1000);
      // target.scrollIntoView({
      //   behavior: "smooth"
      // });
      target.parentNode.scrollTop =
        target.offsetTop - target.parentNode.offsetTop;
    }
  }

  // animateScroll(target, duration) {
  //   const positionStart = target.parentNode.scrollTop;
  //   const positionEnd = target.offsetTop - target.parentNode.offsetTop;
  //   const scrollStep = ((positionStart - positionEnd) / duration) * 15;

  //   this.scrollInterval = setInterval(() => {
  //     if (target.parentNode.scrollTop !== positionEnd) {
  //       if (scrollStep < 0) {
  //         target.parentNode.scrollTop -= scrollStep;
  //       } else {
  //         target.parentNode.scrollTop += scrollStep;
  //       }
  //     }
  //   }, 15);
  //   // target.parentNode.scrollTop = positionEnd
  // }

  render() {
    const { clue, onClueClick } = this.props;
    return (
      <Ref innerRef={this.liRef}>
        <List.Item
          onClick={() => onClueClick(clue.label)}
          style={{
            backgroundColor: clue.hostSelected
              ? "pink"
              : clue.guestSelected
                ? "lavender"
                : "",
            color: clue.answered ? "grey" : "black"
          }}
        >
          <List.Content>
            <span className="clue-number">{`${clue.label}`}</span>
            {clue.text}
          </List.Content>
        </List.Item>
      </Ref>
    );
  }
}

export default ClueItem;
