import React from "react";
import { connect } from "react-redux";
import { List, Header, Segment } from "semantic-ui-react";
import * as moment from "moment";

import { getSavedPuzzles, loadPuzzle } from "../../actions/user";

import DefaultLayout from "../layouts/DefaultLayout";

class SavedPuzzlesPage extends React.Component {
  onSavedPuzzleClick = id => {
    this.props.loadPuzzle(id);
  };

  getDisplayTime(timer) {
    const format = timer > 60 * 60 * 1000 ? "H:mm:ss" : "mm:ss";
    return moment.utc(timer).format(format);
  }

  renderPuzzles() {
    return this.props.savedPuzzles.map(p => {
      return (
        <List.Item key={p.id}>
          <List.Icon name="chess board" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header onClick={() => this.onSavedPuzzleClick(p.id)} as="a">
              {p.title}
            </List.Header>
            <List.Description as="a">
              {this.getDisplayTime(p.timer)}
            </List.Description>
          </List.Content>
        </List.Item>
      );
    });
  }

  render() {
    return this.props.savedPuzzles.length ? (
      <DefaultLayout>
        <Segment>
          <Header as="h1">Saved Puzzles</Header>
          <List divided relaxed>
            {this.renderPuzzles()}
          </List>
        </Segment>
      </DefaultLayout>
    ) : (
      <DefaultLayout>
        <div>Loading...</div>
      </DefaultLayout>
    );
  }
}

const mapStateToProps = ({ user: { savedPuzzles } }) => ({ savedPuzzles });

export default connect(
  mapStateToProps,
  {
    getSavedPuzzles,
    loadPuzzle
  }
)(SavedPuzzlesPage);
