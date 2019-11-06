import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { bindActionCreators } from 'redux';

import './play-layout.styles.css';
import { notifyMessage } from '../../../utils/notification';
import { gameActions } from '../../../actions';

class PlayLayout extends React.Component {
  render() {
    const { isPlaying, actions } = this.props;

    return (
      <div className="play-layout">
        <div className="play-layout__content">
          <Link
            to="/"
            onClick={e => {
              if (isPlaying) {
                notifyMessage({
                  type: 'WARN',
                  message: 'You is in the match, you can not go out'
                });
                e.preventDefault();
              } else {
                actions.resetGameState();
                actions.playWithComputer();
              }
            }}
            className="play-layout__content__back-home-button"
          >
            <Button type="primary">Home</Button>
          </Link>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isPlaying: get(state, ['gameReducer', 'isPlaying'])
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      resetGameState: gameActions.resetGameState,
      playWithComputer: gameActions.playWithComputer
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayLayout);
