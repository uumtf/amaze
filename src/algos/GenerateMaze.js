import {array_equals} from '../Utils.js'

function randomEvenNum(min, max) {
  min = Math.floor(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * ((max - min) / 2 + 1)) * 2 + min;
}

let blocks = [];

export function recursiveGeneration(startPoint, endPoint, leftUp, rightDown) {
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

export function generate(type, startPoint, endPoint, leftUp, rightDown) {
  blocks = [];
  if(type == "recursive") 
    recursiveGeneration(startPoint, endPoint, leftUp, rightDown);
  return blocks;
}
