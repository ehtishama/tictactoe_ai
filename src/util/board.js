// converts x, y coordinates of a cell to its index position in the array
export function xy_to_index(x, y, boardSize = 3) {
  return boardSize * x + y;
}

// converts the index position of a cell to (x, y) coordinate
export function index_to_xy(index, boardSize = 3) {
  let x = Math.floor(index / boardSize);
  let y = index % boardSize;

  return [x, y];
}

// returns true when there is no empty cell
export function is_no_empty_cells(gameState, boardSize = 3) {
  for (let i = 0; i < boardSize * boardSize; i++)
    if (!gameState[i]) return false;
  return true;
}

// return score for a finished game
// score => 0 = Tie
//          1 = agent won
//         -1 = human won (agent lost)

export function get_score(gameState) {
  // check rows
  for (let i = 0; i < 3; i++) {
    let rowSame = true;
    const first = gameState[i * 3 + 0];

    // go to next row if the first(any) cell is empty
    if (!first) continue;

    for (let j = 0; j < 3; j++) {
      if (gameState[i * 3 + j] !== first) rowSame = false;
    }

    if (rowSame && first === 1) return 1; // agent lost
    if (rowSame && first === -1) return -1; // agent won
  }

  // check columns
  for (let i = 0; i < 3; i++) {
    let colSame = true;
    const first = gameState[i + 0 * 3];

    // go to next col if the first(any) cell is empty
    if (!first) continue;

    for (let j = 0; j < 3; j++) {
      if (gameState[i + j * 3] !== first) colSame = false;
    }

    if (colSame && first === 1) return 1;
    if (colSame && first === -1) return -1;
  }

  // check diagnols

  // primary diagnol
  let first = gameState[xy_to_index(0, 0)];
  let primaryDiagnolSame = true;

  for (let i = 0; i < 3; i++) {
    if (gameState[xy_to_index(i, i)] !== first) primaryDiagnolSame = false;
  }
  if (primaryDiagnolSame && first === 1) return 1;
  if (primaryDiagnolSame && first === -1) return -1;

  // secondary diagnol
  first = gameState[xy_to_index(0, 2)];
  let secondaryDiagnolSame = true;

  for (let i = 0; i < 3; i++) {
    if (gameState[xy_to_index(i, 3 - 1 - i)] !== first)
      secondaryDiagnolSame = false;
  }
  if (secondaryDiagnolSame && first === 1) return 1;
  if (secondaryDiagnolSame && first === -1) return -1;

  return 0;
}

// returns indices for the empty cells
export function get_empty_cells(gameState, boardSize = 3) {
  const empty_cells = [];

  for (let i = 0; i < boardSize * boardSize; i++) {
    if (!gameState[i]) empty_cells.push(i);
  }

  return empty_cells;
}

export const is_winning_state = (gameState) => {
  // check rows
  for (let i = 0; i < 3; i++) {
    let rowSame = true;
    const first = gameState[i * 3 + 0];

    // go to next row if the first(any) cell is empty
    if (!first) continue;

    for (let j = 0; j < 3; j++) {
      if (gameState[i * 3 + j] !== first) rowSame = false;
    }

    if (rowSame) return true;
  }

  // check columns
  for (let i = 0; i < 3; i++) {
    let colSame = true;
    const first = gameState[i + 0 * 3];

    // go to next row if the first(any) cell is empty
    if (!first) continue;

    for (let j = 0; j < 3; j++) {
      if (gameState[i + j * 3] !== first) colSame = false;
    }

    if (colSame) return true;
  }
  // check diagnols

  // primary diagnol
  let first = gameState[xy_to_index(0, 0)];
  let primaryDiagnolSame = true;

  for (let i = 0; i < 3; i++) {
    if (gameState[xy_to_index(i, i)] !== first) primaryDiagnolSame = false;
  }
  if (first && primaryDiagnolSame) return true;

  // secondary diagnol
  first = gameState[xy_to_index(0, 2)];
  let secondaryDiagnolSame = true;

  for (let i = 0; i < 3; i++) {
    // console.log("Secondary diagnol: ", i, 3 - 1 - i, xy_to_index(i, 3 - 1 - i));
    if (gameState[xy_to_index(i, 3 - 1 - i)] !== first)
      secondaryDiagnolSame = false;
  }

  if (first && secondaryDiagnolSame) return true;

  return false;
};
