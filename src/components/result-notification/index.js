import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { Button } from 'antd';
import { bindActionCreators } from 'redux';
import { gameActions } from '../../actions';

import './result-notification.styles.css';

class ResultNotification extends React.Component {
  constructor() {
    super();
    this.onClickOkButton = this.onClickOkButton.bind(this);
  }

  onClickOkButton() {
    this.props.actions.resetGameState();
  }

  render() {
    const { isWinner, notifyResult } = this.props;

    return !notifyResult ? null : (
      <div className="result-notification">
        <div className="result-notification__content">
          <img
            src={`/images/${isWinner ? 'caro-win.jpg' : 'caro-lose.jpg'}`}
            alt="icon"
          />
          <span>
            {isWinner
              ? 'Congraduate!!! You won this match'
              : 'Oh, unfortunate!!! You can not win this match'}
          </span>
          <Button type="primary" onClick={this.onClickOkButton}>
            Ok
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isWinner: get(state, ['gameReducer', 'isWinner']),
  notifyResult: get(state, ['gameReducer', 'notifyResult'])
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      resetGameState: gameActions.resetGameState
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultNotification);
