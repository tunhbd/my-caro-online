export const cloneBoard = board => {
  const clonedBoard = board.map(row => [...row]);

  return clonedBoard;
}