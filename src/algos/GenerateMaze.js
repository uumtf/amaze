import {array_equals, array_shuffle} from '../Utils.js'

let blocks = [];
let directions = [
  [0, 2],
  [0, -2],
  [2, 0],
  [-2, 0]
];
let grid;


function randomEvenNum(min, max) {
  min = Math.floor(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * ((max - min) / 2 + 1)) * 2 + min;
}

function recursiveGeneration(startPoint, endPoint, leftUp, rightDown) {
  let height = (rightDown[0]-leftUp[0]);
  let width = (rightDown[1]-leftUp[1]);
  if(width < 2 || height < 2)
    return;
  if(height > width) {
    // horizontal split
    let wall = randomEvenNum(leftUp[0]+1, leftUp[0]+height-1);
    let space = [wall, randomEvenNum(leftUp[1], rightDown[1])];
    for(let i=leftUp[1]; i <= rightDown[1]; i++) { 
      if(array_equals(startPoint, [wall, i]) ||
        array_equals(endPoint, [wall,i]) ||
        array_equals(space, [wall, i]))
        continue;
      blocks.push([wall, i]);
    }
    recursiveGeneration(startPoint, endPoint, leftUp, [wall-1, rightDown[1]]); //up
    recursiveGeneration(startPoint, endPoint, [wall+1, leftUp[1]], rightDown); //down
  }
  else {
    // vertical split
    let wall = randomEvenNum(leftUp[1]+1, leftUp[1]+width-1);
    let space = [randomEvenNum(leftUp[0], rightDown[0]), wall];
    for(let i=leftUp[0]; i <= rightDown[0]; i++) {
      if(array_equals(startPoint, [i, wall]) ||
        array_equals(endPoint, [i, wall]) ||
        array_equals(space, [i, wall]))
        continue;
      blocks.push([i, wall]);
    }
    recursiveGeneration(startPoint, endPoint, leftUp, [rightDown[0], wall-1]); //left
    recursiveGeneration(startPoint, endPoint, [leftUp[0], wall+1], rightDown); //right
  }
}

function check_direction(rows, columns, first, second) {
  //check borders
  if(first[0] < 0 || first[0] >= rows ||
      first[1] < 0 || first[1] >= columns ||
      second[0] < 0 || second[0] >= rows ||
      second[1] < 0 || second[1] >= columns)
    return false;

  //check that squares are walls
  if(grid[first[0]][first[1]] != 1 ||
     grid[second[0]][second[1]] != 1)
    return false;

  return true;
}

function backtracking(rows, columns, point) {
  directions = array_shuffle(directions);
  for(let i in directions) {
    let first = [point[0] + directions[i][0]/2, point[1] + directions[i][1]/2];
    let second = [point[0] + directions[i][0], point[1] + directions[i][1]];
    if(check_direction(rows, columns, first, second)) {
      blocks.push(first);
      blocks.push(second);
      grid[first[0]][first[1]] = 0;
      grid[second[0]][second[1]] = 0;
      backtracking(rows, columns, second);
    }
  }
}

export function generate(type, startPoint, endPoint, board, rows, columns) {
  blocks = [];
  grid = board;
  if(type == "recursive") 
    recursiveGeneration(startPoint, endPoint, [0,0], [rows-1, columns-1]);
  if(type == "backtracking")
    backtracking(rows, columns, startPoint);
  return blocks;
}
