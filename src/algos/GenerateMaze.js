import {fill_matrix, array_equals, array_shuffle} from '../Utils.js'

let blocks = [];
let directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0]
];
let grid;
let parents = [];
let edges = [];
function randomEvenNum(min, max) {
  min = Math.floor(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * ((max - min) / 2 + 1)) * 2 + min;
}

function recursive(leftUp, rightDown) {
  let height = (rightDown[0]-leftUp[0]);
  let width = (rightDown[1]-leftUp[1]);
  if(width < 2 || height < 2)
    return;
  if(height > width) {
    // horizontal split
    let wall = randomEvenNum(leftUp[0]+1, leftUp[0]+height-1);
    let space = [wall, randomEvenNum(leftUp[1], rightDown[1])];
    for(let i=leftUp[1]; i <= rightDown[1]; i++) { 
      if(grid[wall][i] > 1 ||
        array_equals(space, [wall, i]))
        continue;
      blocks.push([wall, i]);
    }
    recursive(leftUp, [wall-1, rightDown[1]]); //up
    recursive([wall+1, leftUp[1]], rightDown); //down
  }
  else {
    // vertical split
    let wall = randomEvenNum(leftUp[1]+1, leftUp[1]+width-1);
    let space = [randomEvenNum(leftUp[0], rightDown[0]), wall];
    for(let i=leftUp[0]; i <= rightDown[0]; i++) {
      if(grid[i][wall] > 1 ||
        array_equals(space, [i, wall]))
        continue;
      blocks.push([i, wall]);
    }
    recursive(leftUp, [rightDown[0], wall-1]); //left
    recursive([leftUp[0], wall+1], rightDown); //right
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
  array_shuffle(directions);
  for(let i in directions) {
    let first = [point[0] + directions[i][0], point[1] + directions[i][1]];
    let second = [point[0] + directions[i][0]*2, point[1] + directions[i][1]*2];
    if(check_direction(rows, columns, first, second)) {
      blocks.push(first);
      blocks.push(second);
      grid[first[0]][first[1]] = 0;
      grid[second[0]][second[1]] = 0;
      backtracking(rows, columns, second);
    }
  }
}

function dsu_get(point) {
  let p = parents[point[0]][point[1]];
  return (point == p ?
          point : 
          p = dsu_get(p));
}

function dsu_unite(first, second) {
  first = dsu_get(first);
  second = dsu_get(second);
  if(!array_equals(first, second))
    parents[first[0]][first[1]] = second;
}

function kruskal(rows, columns) {
  parents = fill_matrix(rows, columns, -1);
  for(let row=0; row<rows; row++) {
    for(let column=0; column<columns; column++) {
      if(row%2 == 0 && column%2 == 0) {
        if( grid[row][column] < 2)
          blocks.push([row, column]);
        parents[row][column] = [row, column];
      }
      else if(row%2 != column%2) {
        edges.push([row, column, row%2]); //row%2 - edge type, 0 - horizontal, 1 - vertical
      }
    }
  }
  array_shuffle(edges);
  for(let i in edges) {
    let first, second;
    if(edges[i][2] == 0) { //horizontal
      first = [edges[i][0], edges[i][1]-1];
      second = [edges[i][0], edges[i][1]+1];
    }
    else { //vertical
      first = [edges[i][0]-1, edges[i][1]];
      second = [edges[i][0]+1, edges[i][1]];
    }
    if(dsu_get(first) != dsu_get(second)) {
      dsu_unite(first, second);
      if(grid[edges[i][0]][edges[i][1]] < 2)
        blocks.push(edges[i]);
    }
  }
}


export function generate(type, startPoint, endPoint, board, rows, columns) {
  blocks = [];
  grid = board;
  if(type == "recursive") 
    recursive([0,0], [rows-1, columns-1]);
  if(type == "backtracking")
    backtracking(rows, columns, startPoint);
  if(type == "kruskal") 
    kruskal(rows, columns); 
  return blocks;
}
