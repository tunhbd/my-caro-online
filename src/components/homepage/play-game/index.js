import React from 'react';
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { get } from 'lodash';

import PlayGameLeftSection from './play-game-left-section';
import PlayGameRightSection from './play-game-right-section';
import { gameActions } from '../../../actions';
import { DEFAULT_AVATAR } from '../../../constants';
import { cloneBoard } from '../../../utils/clone-board';
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
      actions.setResult(result);
      if (id === this.socket.id) {
        actions.notifyWinner();
      } else {
        actions.notifyLoser();
      }
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

  sendMessage(text) {
    const { actions, room } = this.props;

    actions.addChatMessage({ mine: true, text });
    this.socket.emit('chat', { roomId: room, message: text });
  }

  render() {
    // const { findingPlayer, isPlaying, playOnline } = this.props;

    return (
      <div className="play-game">
        <PlayGameLeftSection
          findPlayer={this.findPlayer}
          startGame={this.startGame}
          chooseCell={this.chooseCell}
        />{' '}
        <PlayGameRightSection />
        <ResultNotification />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isPlaying: get(state, ['gameReducer', 'isPlaying']),
  findingPlayer: get(state, ['gameReducer', 'findingPlayer']),
  playOnline: get(state, ['gameReducer', 'playOnline']),
  profile: get(state, ['authReducer', 'profile']),
  room: get(state, ['gameReducer', 'room']),
  boardStates: get(state, ['gameReducer', 'boardStates']),
  currentBoardState: get(state, ['gameReducer', 'currentBoardState']),
  symbol: get(state, ['gameReducer', 'symbol'])
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
        sliceBoardStates: gameActions.sliceBoardStates
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fighting);
