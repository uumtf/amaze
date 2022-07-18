import {array_equals, matrix_copy, fill_matrix} from '../Utils.js'

let directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0]
];

let grid;
let marked;
let step;
let parents = []
let path = [];

function check_direction(rows, columns, first) {
  //check borders
  if(first[0] < 0 || first[0] >= rows ||
      first[1] < 0 || first[1] >= columns)
    return false;

  //check that squares are empty
  if(grid[first[0]][first[1]] != 0 &&
    grid[first[0]][first[1]] != 3)
    return false;

  return true;
}

function mark_neighbours(point, rows, columns, endPoint) {
  for(let i in directions) {
    let first = [point[0] + directions[i][0], point[1] + directions[i][1]];
    if(check_direction(rows, columns, first)) {
      grid[first[0]][first[1]] = 4;
      marked.push(first);
      parents[first[0]][first[1]] = point;
    }
  }
}

function bfs(rows, columns, startPoint, endPoint) {
  marked.push(startPoint);
  mark_neighbours(startPoint, rows, columns);
  let found = false;
  while(marked.length > 0 && found == false) {
    let current = marked.shift();
    if(!array_equals(startPoint, current) &&
        !array_equals(endPoint, current))
      step.push(current); 
    if(array_equals(endPoint, current)) {
      found = true;
    }
    mark_neighbours(current, rows, columns, endPoint);
  }
  if(!found) return;
  for(let v = parents[endPoint[0]][endPoint[1]]; !array_equals(v, startPoint); v = parents[v[0]][v[1]])
    path.push(v);
}

export function solve(type, board, startPoint, endPoint, rows, columns) {
  grid = matrix_copy(board); 
  parents = fill_matrix(rows, columns, [-1, -1]);
  step = [];
  marked = [];
  path = [];
  if(type == "bfs") {
    bfs(rows, columns, startPoint, endPoint);
  }
  return [step, path];
}
