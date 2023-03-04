// minmax
// Minimize the maximum possible loss

/**
 * Moves Representation
 * human => 1
 * agent => -1
 *
 *
 * Scoring Representation
 * human won => 1
 * tie => 0
 * agent  won => -1
 */

import {
  get_empty_cells,
  is_no_empty_cells,
  get_score,
  is_winning_state,
} from "../util/board";

export function minmax(currState, turn = -1) {
  const possibleMoves = get_empty_cells(currState);

  if (possibleMoves.length === 0) return 0;
  const losses = new Map();

  for (const move of possibleMoves) {
    const loss = min(currState, move);
    losses.set(move, loss);
  }

  const bestMove = [...losses.entries()].sort((a, b) => a[1] - b[1])[0][0];
  return bestMove;
}

// what is the max possible loss you could get
// if you play this move
function min(currState, newMoveIdx) {
  // if winning state return score
  if (is_no_empty_cells(currState)) return get_score(currState);
  if (is_winning_state(currState)) return get_score(currState);

  const nextState = [...currState];
  nextState[newMoveIdx] = -1;

  // console.log("next state: ", nextState);
  const possibleMoves = get_empty_cells(nextState);
  if (possibleMoves.length === 0) return get_score(nextState);
  const outcomes = [];
  for (let move of possibleMoves) {
    outcomes.push(max(nextState, move));
  }
  // console.log(outcomes);
  return Math.max(...outcomes);
}

// what is the minimum possible loss you could get
// if you play this move
function max(currState, newMoveIdx) {
  // if winning state return score
  if (is_winning_state(currState)) return get_score(currState);
  if (is_no_empty_cells(currState)) return get_score(currState);

  const nextState = [...currState];
  nextState[newMoveIdx] = 1;

  const possibleMoves = get_empty_cells(nextState);
  if (possibleMoves.length === 0) return get_score(nextState);
  const outcomes = [];
  for (let move of possibleMoves) {
    outcomes.push(min(nextState, move));
  }
  // console.log("Outcomes... ", outcomes);
  return Math.min(...outcomes);
}
