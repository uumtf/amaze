import {array_equals, matrix_copy, fill_matrix} from '../Utils.js'

let directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0]
];

let grid;
let cost;
let marked;
let steps;
let parents = []
let path = [];

function check_points(rows, columns, points, types) {
  for(let i in points) {
    let point = points[i];
    //check borders
    if(point[0] < 0 || point[0] >= rows ||
        point[1] < 0 || point[1] >= columns)
      return false;

    //check types
    for(let j in types)
      if(grid[point[0]][point[1]] == types[j])
        return false;
  }
  return true;
}

function distance(first, second) {
  return Math.SQRT2 * Math.sqrt(Math.pow(first[0]-second[0], 2) + Math.pow(first[1]-second[1], 2));
}

function mark_neighbours(point, rows, columns) {
  for(let i in directions) {
    let first = [point[0] + directions[i][0], point[1] + directions[i][1]];
    if(check_points(rows, columns, [first], [1, 2, 4])) {
      grid[first[0]][first[1]] = 4;
      cost[first[0]][first[1]] = cost[point[0]][point[1]]+1;
      marked.push(first);
      parents[first[0]][first[1]] = point;
    }
  }
}

function bfs(rows, columns, startPoint, endPoint) {
  marked.push(startPoint);
  mark_neighbours(startPoint, rows, columns, endPoint);
  let found = false;
  while(marked.length > 0 && found == false) {
    let current = marked.shift();
    if(!array_equals(startPoint, current) &&
        !array_equals(endPoint, current))
      steps.push(current); 
    if(array_equals(endPoint, current)) {
      found = true;
    }
    mark_neighbours(current, rows, columns, endPoint);
  }
  if(!found) return;
  for(let v = parents[endPoint[0]][endPoint[1]]; !array_equals(v, startPoint); v = parents[v[0]][v[1]])
    path.push(v);
}


function a_star(rows, columns, startPoint, endPoint) {
  marked.push(startPoint);
  mark_neighbours(startPoint, rows, columns, endPoint);
  let found = false;
  while(marked.length > 0 && found == false) {
    marked.sort(function(first, second) {
      let firstValue = cost[first[0]][first[1]] + distance(first, endPoint);
      let secondValue = cost[second[0]][second[1]] + distance(second, endPoint);
      return firstValue - secondValue;
    });
    let current = marked.shift();
    if(!array_equals(startPoint, current) &&
        !array_equals(endPoint, current))
      steps.push(current); 
    if(array_equals(endPoint, current)) {
      found = true;
    }
    mark_neighbours(current, rows, columns, endPoint);
  }
  if(!found) return;
  for(let v = parents[endPoint[0]][endPoint[1]]; !array_equals(v, startPoint); v = parents[v[0]][v[1]])
    path.push(v);
}

function greedy(rows, columns, startPoint, endPoint) {
  marked.push(startPoint);
  mark_neighbours(startPoint, rows, columns, endPoint);
  let found = false;
  while(marked.length > 0 && found == false) {
    marked.sort(function(first, second) {
      let firstValue = distance(first, endPoint);
      let secondValue = distance(second, endPoint);
      return firstValue - secondValue;
    });
    let current = marked.shift();
    if(!array_equals(startPoint, current) &&
        !array_equals(endPoint, current))
      steps.push(current); 
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
  cost = fill_matrix(rows, columns, 0);
  steps = [];
  marked = [];
  path = [];
  if(type == "bfs")
    bfs(rows, columns, startPoint, endPoint);
  if(type == "astar")
    a_star(rows, columns, startPoint, endPoint);
  if(type == "greedy")
    greedy(rows, columns, startPoint, endPoint);
  return [steps, path];
}
