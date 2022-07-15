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
