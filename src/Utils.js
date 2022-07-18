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
    return array;
}

