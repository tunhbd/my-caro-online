import React from 'react';
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { Modal, Spin } from 'antd';

import PlayGameLeftSection from './play-game-left-section';
import PlayGameRightSection from './play-game-right-section';
import { gameActions } from '../../../actions';
import { DEFAULT_AVATAR } from '../../../constants';
import { cloneBoard } from '../../../utils/clone-board';
import { notifyMessage } from '../../../utils/notification';
import './play-game.styles.css';
import ResultNotification from '../../result-notification';

class Fighting extends React.Component {
  constructor() {
    super();

    this.socket = null;
    this.configSocket = this.configSocket.bind(this);
    this.findPlayer = this.findPlayer.bind(this);
    this.nextTurn = this.nextTurn.bind(this);
    this.startGame = this.startGame.bind(this);
    this.chooseCell = this.chooseCell.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.requestDraw = this.requestDraw.bind(this);
    this.requestLose = this.requestLose.bind(this);
    this.requestUndo = this.requestUndo.bind(this);
    this.confirmDraw = this.confirmDraw.bind(this);
    this.confirmLose = this.confirmLose.bind(this);
    this.confirmUndo = this.confirmUndo.bind(this);

    this.state = {
      confirmRequest: false,
      contentConfirmRequest: '',
      ok: null,
      cancel: null
    };
  }

  componentDidMount() {
    // const { actions } = this.props;

    // actions.fighting();
    this.configSocket();
  }

  findPlayer() {
    const { profile } = this.props;

    console.log('find player');
    this.props.actions.findPlayer();
    this.socket.emit('find player', {
      player: {
        avatar: get(profile, 'avatar', DEFAULT_AVATAR) || DEFAULT_AVATAR,
        name: get(profile, 'display_name', 'Your name')
      }
    });
  }

  configSocket() {
    const { actions } = this.props;

    this.socket = io(`${process.env.REACT_APP_API_HOST}/play-game`);

    this.socket.on('welcome to namespace', nsp => {
      console.log('connected to socket server in namespace', nsp);
      console.log(this.props.playOnline ? 'VS' : 'play with computer');
    });

    // for play online with other player
    this.socket.on('joined room', ({ roomId }) => {
      console.log('joined to room', roomId);
      actions.updateRoom(roomId);
    });

    this.socket.on('vs player', ({ player }) => {
      console.log('got player');
      actions.updateVsPlayer(player);
      actions.findPlayerDone();
    });

    this.socket.on('player ready', () => {
      console.log('player ready');
      // actions.updateVsPlayerStatus(true);
      actions.playerReady();
      if (this.props.IAmReady) {
        console.log('start game');
        actions.startGame();
      }
    });

    this.socket.on('start game', ({ firstPlayer }) => {
      console.log('begin game');
      if (firstPlayer === this.socket.id) {
        actions.inTurn();
        actions.setPlayerSymbol('X');
        actions.replaceTurnFirstBoardState(true);
      } else {
        actions.setPlayerSymbol('O');
      }

      actions.startGame();
    });

    this.socket.on('next turn', ({ board, x, y }) => {
      console.log('next my turn', board, x, y);
      actions.addNewBoardState({
        cell: {
          rowOrder: x,
          colOrder: y
        },
        board,
        myTurn: true
      });
      console.log('before currentBoardState', this.props.currentBoardState);
      actions.setCurrentBoardState({
        boardOrder: this.props.currentBoardState.boardOrder + 1
      });

      actions.inTurn();
    });

    this.socket.on('got winner', ({ id, result }) => {
      console.log('got winner');
      actions.stopGame();
      actions.setResult(result || []);
      this.socket.emit('finish match', { roomId: this.props.room });

      if (!id) {
        actions.notifyDraw();
      } else if (id === this.socket.id) {
        actions.notifyWinner();
      } else {
        actions.notifyLoser();
      }
    });

    this.socket.on('draw', () => {
      this.confirmDraw();
    });

    this.socket.on('lose', () => {
      this.confirmLose();
    });

    this.socket.on('undo', () => {
      this.confirmUndo();
    });

    this.socket.on('chat', ({ message }) => {
      console.log('receive chat message');
      actions.addChatMessage({ mine: false, text: message });
    });
  }

  startGame() {
    const { room, playOnline, actions, vsPlayerReady } = this.props;

    if (!playOnline) {
      actions.inTurn();
      actions.setPlayerSymbol('X');
      actions.startGame();
    } else {
      this.socket.emit('ready', { roomId: room });
      actions.IAmReady();
      if (vsPlayerReady) {
        actions.startGame();
      }
    }
  }

  nextTurn(board, x, y) {
    const { room, isPlaying } = this.props;

    isPlaying && this.socket.emit('next turn', { roomId: room, board, x, y });
  }

  chooseCell(x, y) {
    const {
      actions,
      isPlaying,
      boardStates,
      currentBoardState,
      symbol,
      playOnline
    } = this.props;

    if (isPlaying) {
      actions.outTurn();

      const board = cloneBoard(boardStates[currentBoardState.boardOrder].board);
      board[x][y] = symbol;
      console.log('board before send', board);

      if (
        !playOnline &&
        currentBoardState.boardOrder + 1 < boardStates.length
      ) {
        actions.sliceBoardStates(0, currentBoardState.boardOrder + 1);
      }
      actions.addNewBoardState({
        board,
        cell: {
          rowOrder: x,
          colOrder: y
        },
        myTurn: false
      });

      actions.setCurrentBoardState({
        boardOrder: currentBoardState.boardOrder + 1
      });

      this.nextTurn(board, x, y);
    }
  }

  requestDraw() {
    const { room, isPlaying, actions, myTurn } = this.props;

    if (!isPlaying) {
      notifyMessage({ type: 'WARN', message: 'Match has not began' });
    }

    // if (myTurn) {
    this.socket.emit('draw', { roomId: room });
    actions.requestPlayer();
    this.socket.on('confirm draw', ({ confirm }) => {
      actions.requestPlayerDone();

      if (!confirm) {
        notifyMessage({
          type: 'WARN',
          message: 'Your draw request was not accepted'
        });
      }
    });
    // } else {
    //   notifyMessage({ type: 'WARN', message: 'It is not your turn' })
    // }
  }

  confirmDraw() {
    const { room } = this.props;

    this.setState({
      confirmRequest: true,
      contentConfirmRequest: 'Your player want to be draw?',
      ok: () => {
        this.socket.emit('confirm draw', { roomId: room, confirm: true });
        this.setState({
          confirmRequest: false,
          contentConfirmRequest: '',
          ok: null,
          cancel: null
        });
      },
      cancel: () => {
        this.socket.emit('confirm draw', { roomId: room, confirm: false });
        this.setState({
          confirmRequest: false,
          contentConfirmRequest: '',
          ok: null,
          cancel: null
        });
      }
    });
  }

  requestLose() {
    const { room, isPlaying, myTurn, actions } = this.props;

    if (!isPlaying) {
      notifyMessage({ type: 'WARN', message: 'Match has not began' });
    }

    // if (myTurn) {
    this.socket.emit('lose', { roomId: room });
    actions.requestPlayer();
    this.socket.on('confirm lose', ({ confirm }) => {
      actions.requestPlayerDone();

      if (!confirm) {
        notifyMessage({
          type: 'WARN',
          message: 'Your lose request was not accepted'
        });
      }
    });
    // } else {
    //   notifyMessage({ type: 'WARN', message: 'It is not your turn' })
    // }
  }

  confirmLose() {
    const { room } = this.props;

    this.setState({
      confirmRequest: true,
      contentConfirmRequest: 'Your player want to be lose?',
      ok: () => {
        this.socket.emit('confirm lose', { roomId: room, confirm: true });
        this.setState({
          confirmRequest: false,
          contentConfirmRequest: '',
          ok: null,
          cancel: null
        });
      },
      cancel: () => {
        this.socket.emit('confirm lose', { roomId: room, confirm: false });
        this.setState({
          confirmRequest: false,
          contentConfirmRequest: '',
          ok: null,
          cancel: null
        });
      }
    });
  }

  requestUndo() {
    const { room, isPlaying, myTurn, actions, currentBoardState } = this.props;

    if (!isPlaying) {
      notifyMessage({ type: 'WARN', message: 'Match has not began' });
      return;
    }

    if (myTurn) {
      this.socket.emit('undo', { roomId: room });
      actions.requestPlayer();
      this.socket.on('confirm undo', ({ confirm }) => {
        actions.requestPlayerDone();

        if (confirm) {
          if (currentBoardState.boardOrder > 0) {
            actions.sliceBoardStates(0, currentBoardState.boardOrder - 1);
            actions.setCurrentBoardState({
              boardOrder: currentBoardState.boardOrder - 2
            });
            // actions.outTurn()
          }
        } else {
          notifyMessage({
            type: 'WARN',
            message: 'Your undo request was not accepted'
          });
        }
      });
    } else {
      notifyMessage({ type: 'WARN', message: 'It is not your turn' });
    }
  }

  confirmUndo() {
    const { room, actions, currentBoardState } = this.props;

    this.setState({
      confirmRequest: true,
      contentConfirmRequest: 'Your player want to undo?',
      ok: () => {
        if (currentBoardState.boardOrder > 0) {
          actions.sliceBoardStates(0, currentBoardState.boardOrder - 1);
          actions.setCurrentBoardState({
            boardOrder: currentBoardState.boardOrder - 2
          });
          // actions.inTurn()
        }

        this.socket.emit('confirm undo', { roomId: room, confirm: true });
        this.setState({
          confirmRequest: false,
          contentConfirmRequest: '',
          ok: null,
          cancel: null
        });
      },
      cancel: () => {
        this.socket.emit('confirm undo', { roomId: room, confirm: false });
        this.setState({
          confirmRequest: false,
          contentConfirmRequest: '',
          ok: null,
          cancel: null
        });
      }
    });
  }

  sendMessage(text) {
    const { actions, room } = this.props;

    actions.addChatMessage({ mine: true, text });
    this.socket.emit('chat', { roomId: room, message: text });
  }

  render() {
    const { isRequestingPlayer } = this.props;
    const { confirmRequest, contentConfirmRequest, ok, cancel } = this.state;

    return (
      <div className="play-game">
        <PlayGameLeftSection
          findPlayer={this.findPlayer}
          startGame={this.startGame}
          chooseCell={this.chooseCell}
        />
        <PlayGameRightSection
          sendMessage={this.sendMessage}
          requestDraw={this.requestDraw}
          requestLose={this.requestLose}
          requestUndo={this.requestUndo}
        />
        <ResultNotification />
        {confirmRequest ? (
          <Modal title="Basic Modal" visible onOk={ok} onCancel={cancel}>
            {contentConfirmRequest}
          </Modal>
        ) : null}
        {isRequestingPlayer ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'fixed',
              top: '0',
              left: '0',
              background: 'rgba(0,0,0,0.3)'
            }}
          >
            Waiting player ready... <Spin size="large" />
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isPlaying: get(state, ['gameReducer', 'isPlaying']),
  myTurn: get(state, ['gameReducer', 'myTurn']),
  findingPlayer: get(state, ['gameReducer', 'findingPlayer']),
  playOnline: get(state, ['gameReducer', 'playOnline']),
  profile: get(state, ['authReducer', 'profile']),
  room: get(state, ['gameReducer', 'room']),
  boardStates: get(state, ['gameReducer', 'boardStates']),
  currentBoardState: get(state, ['gameReducer', 'currentBoardState']),
  symbol: get(state, ['gameReducer', 'symbol']),
  isRequestingPlayer: get(state, ['gameReducer', 'isRequestingPlayer'])
});

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        inTurn: gameActions.inTurn,
        outTurn: gameActions.outTurn,
        updateRoom: gameActions.updateRoom,
        findPlayer: gameActions.findPlayer,
        findPlayerDone: gameActions.findPlayerDone,
        addNewBoardState: gameActions.addNewBoardState,
        setCurrentBoardState: gameActions.setCurrentBoardState,
        startGame: gameActions.startGame,
        stopGame: gameActions.stopGame,
        setResult: gameActions.setResult,
        setPlayerSymbol: gameActions.setPlayerSymbol,
        playerReady: gameActions.playerReady,
        updateVsPlayer: gameActions.updateVsPlayer,
        IAmReady: gameActions.IAmReady,
        replaceTurnFirstBoardState: gameActions.replaceTurnFirstBoardState,
        notifyWinner: gameActions.notifyWinner,
        notifyLoser: gameActions.notifyLoser,
        notifyDraw: gameActions.notifyDraw,
        sliceBoardStates: gameActions.sliceBoardStates,
        addChatMessage: gameActions.addChatMessage,
        requestPlayer: gameActions.requestPlayer,
        requestPlayerDone: gameActions.requestPlayerDone
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fighting);
