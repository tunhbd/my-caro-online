import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PlayGame from '../play-game';
import { gameActions } from '../../../actions';

class Fighting extends React.Component {
  // constructor() {
  //   super();

  //   this.props.actions.playOnline();
  // }

  componentDidMount() {
    this.props.actions.playOnline();
  }

  render() {
    return <PlayGame />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        playOnline: gameActions.playOnline
      },
      dispatch
    )
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Fighting);
