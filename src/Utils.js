export function fill_matrix(rows, columns, value) {
  let matrix = new Array(rows);
  for(let i=0; i<rows; i++) {
    matrix[i] = new Array(columns).fill(value);
  }
  return matrix;
}

export function array_equals(first, second) {
  return JSON.stringify(first) == JSON.stringify(second);
}

export function array_shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

export function matrix_copy(array) {
  let matrix = new Array(array.length);
  for(let i = 0; i < array.length; i++) {
    matrix[i] = new Array(array[i].length);
    for(let j = 0; j < array[i].length; j++) 
      matrix[i][j] = array[i][j];
  }
  return matrix;
}
