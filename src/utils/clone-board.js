// eslint-disable-next-line import/prefer-default-export
export const cloneBoard = board => {
  const clonedBoard = board.map(row => [...row]);

  return clonedBoard;
};
