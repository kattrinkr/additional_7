module.exports = function solveSudoku(matrix) {
  return solved(matrix, 0, 0);

};
  function solved(initial, row, col){
    if (row === 9) {
      return initial;
    }

    if (initial[row][col] === 0) {
      var arrSolved = [];
      arrSolved.push(getRowValue(initial[row]));
      arrSolved.push(getColValue(initial, col));
      arrSolved.push(getSquareValue(initial, row, col));
      var solve = getSolved(arrSolved);

      for (var i = 0; i < solve.length; i++) {
        initial[row][col] = solve[i];
        if (col === 8) {
          if (solved(initial, row + 1, 0)) return initial;
        } else if (solved(initial, row, col + 1)) return initial;
        initial[row][col] = 0;
      }

    } else {
       if (col === 8) {
         if (solved(initial, row + 1, 0)) return initial;
       } else {
         if (solved(initial, row, col + 1)) return initial;
       }
       return false;
    }

  }


//Данная функция находит решения по строке
  function getRowValue(row) {
    var set = new Set();
    var value = [];
    for (var i = 0; i < row.length; i++) {
      if (row[i] !== 0) {
        set.add(row[i]);
      }
    }
    for (i = 1; i <= 9; i++) {
      if (!(set.has(i))) {
        value.push(i);
      }
    }
    return value;
  }

  function getColValue(initial, col) {
    var set = new Set();
    var value = [];
    for (var i = 0; i < initial.length; i++) {
      if (initial[i][col] !== 0) {
        set.add(initial[i][col]);
      }
    }
    for (i = 1; i <= 9; i++) {
      if (!(set.has(i))) {
        value.push(i);
      }
    }
    return value;
  }
  function getSquareValue(initial, row, col) {
    var set = new Set();
    var rowPos = 0; colPos = 0, value = [];
    switch (row) {
      case 0:
      case 1:
      case 2:
        rowPos = 0;
        break;
      case 3:
      case 4:
      case 5:
        rowPos = 3;
        break;
      case 6:
      case 7:
      case 8:
        rowPos = 6;
        break;
    }
    switch (col) {
      case 0:
      case 1:
      case 2:
        colPos = 0;
        break;
      case 3:
      case 4:
      case 5:
        colPos = 3;
        break;
      case 6:
      case 7:
      case 8:
        colPos = 6;
        break;
    }
    for (var i = rowPos; i < rowPos + 3; i++) {
      for (var j = colPos; j < colPos + 3; j++) {
        if (initial[i][j] !== 0) {
          set.add(initial[i][j]);
        }
      }
    }
    for (i = 1; i <= 9; i++) {
      if (!(set.has(i))) {
        value.push(i);
      }
    }
    return value;
  }


  function getSolved(arrSolved) {
    arrSolved.sort(function(a,b){
      return a.length - b.length;
    });

    var value = [];
      arrSolved[0].map(function(elem) {
        if ((arrSolved[0].indexOf(elem) >= 0) && (arrSolved[1].indexOf(elem) >= 0) && (arrSolved[2].indexOf(elem) >= 0)) {
          value.push(elem);
        }
      });
      if (value.length !== 0) {
        return value;
      }
    return 0;
  }
