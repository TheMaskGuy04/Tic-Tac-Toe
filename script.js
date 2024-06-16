const cell = document.getElementsByClassName("cell");
const single = document.getElementById("single");
const double = document.getElementById("double");

let choice = "";

let turn = "X";

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

single.addEventListener("click", () => {
  double.disabled = true;

  choice = "single";
});

double.addEventListener("click", () => {
  single.disabled = true;

  choice = "double";
});

for (let i = 0; i < cell.length; i++) {
  //
  const element = cell[i];
  // console.log(element);

  element.addEventListener("click", (event) => {
    // console.log(event.target.id);

    if (choice.length != 0) {
      //
      const id = event.target.id;
      const curr_cell = document.getElementById(id);
      curr_cell.innerHTML = `<h3>${turn}</h3>`;

      let temp = Math.floor((id - 1) / 3);
      let row = temp;

      temp = (id - 1) % 3;
      let column = temp;

      // console.log(row, column);
      board[row][column] = turn;

      if (choice == "double") turn = turn == "X" ? "O" : "X";

      let check = checkWinner();
      if (check != false) {
        // alert(`Winner is ${check}`);

        // stop();

        // return;

        setTimeout(() => {
          alert(`Winner is ${check}`);

          stop();
        }, 100);
        return;
      }

      if (checkForDraw() == true) {
        setTimeout(() => {
          alert(`Its a draw`);

          stop();
        }, 100);
        return;
      }

      if (choice == "single") {
        turn = "O";

        nextMove();

        turn = "X";

        check = checkWinner();
        if (check != false) {
          // alert(`Winner is ${check}`);

          // stop();

          // return;

          setTimeout(() => {
            alert(`Winner is ${check}`);

            stop();
          }, 100);
          return;
        }

        if (checkForDraw() == true) {
          // alert(`Its a draw`);

          // stop();

          // return;

          setTimeout(() => {
            alert(`Its a draw`);

            stop();
          }, 100);
          return;
        }
      }
    } else {
      alert("Please Select Single or Double Player");
    }
  });
}

function stop() {
  choice = "";
  single.disabled = false;
  double.disabled = false;
  turn = "X";
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  for (let i = 0; i < cell.length; i++) {
    //
    const element = cell[i];

    element.innerHTML = "";
  }
}

function checkForDraw() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j].length == 0) {
        return false;
      }
    }
  }

  return true;
}

function checkWinner() {
  // console.log(board);

  // horizontal checking
  let temp = board[0];
  if (temp[0] == temp[1] && temp[1] == temp[2]) {
    // console.log("H1");
    return temp[0];
  }

  temp = board[1];
  if (temp[0] == temp[1] && temp[1] == temp[2]) {
    // console.log("H2");
    return temp[0];
  }

  temp = board[2];
  if (temp[0] == temp[1] && temp[1] == temp[2]) {
    // console.log("H3");
    return temp[0];
  }

  //vertical checking
  if (board[0][0] == board[1][0] && board[1][0] == board[2][0]) {
    // console.log("V1");
    return board[0][0];
  }

  if (board[0][1] == board[1][1] && board[1][1] == board[2][1]) {
    // console.log("V2");
    return board[0][1];
  }

  if (board[0][2] == board[1][2] && board[1][2] == board[2][2]) {
    // console.log("V3");
    return board[0][2];
  }

  // diagonal checking
  if (board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
    // console.log("D1");
    return board[0][0];
  }

  if (board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
    // console.log("D2");
    return board[0][2];
  }

  return false;
}

function nextMove() {
  // console.log("Computer's turn");

  let possible = [
    [0, 1, 2],
    [1, 2, 0],
    [0, 2, 1],
    [3, 4, 5],
    [4, 5, 3],
    [3, 5, 4],
    [6, 7, 8],
    [7, 8, 6],
    [6, 8, 7],
    [0, 3, 6],
    [3, 6, 0],
    [0, 6, 3],
    [1, 4, 7],
    [4, 7, 1],
    [1, 7, 4],
    [2, 5, 8],
    [5, 8, 2],
    [2, 8, 5],
    [0, 4, 8],
    [4, 8, 0],
    [0, 8, 4],
    [2, 4, 6],
    [4, 6, 2],
    [2, 6, 4],
  ];

  for (let i = 0; i < possible.length; i++) {
    let temp = possible[i];

    let index1 = temp[0];
    let index2 = temp[1];
    let index3 = temp[2];

    // console.log(temp, index1, index2, index3);

    let temp1 = Math.floor(index1 / 3);
    let row1 = temp1;
    temp1 = Math.floor(index2 / 3);
    let row2 = temp1;
    temp1 = Math.floor(index3 / 3);
    let row3 = temp1;

    temp1 = index1 % 3;
    let column1 = temp1;
    temp1 = index2 % 3;
    let column2 = temp1;
    temp1 = index3 % 3;
    let column3 = temp1;

    let box1 = board[row1][column1];
    let box2 = board[row2][column2];

    if (box1 == "O" && box2 == "O") {
      if (board[row3][column3].length == 0) {
        board[row3][column3] = "O";

        // console.log(temp, index1, index2, index3);

        cell[index3].innerHTML = `<h3>${turn}</h3>`;

        return;
      }
    } else if (box1 == "X" && box2 == "X") {
      // console.log("Found it");
      // console.log(temp, index1, index2, index3);

      if (board[row3][column3].length == 0) {
        board[row3][column3] = "O";

        cell[index3].innerHTML = `<h3>${turn}</h3>`;

        return;
      }
    }
  }

  for (let i = 0; i < 9; i++) {
    let random = i;

    // console.log(random);

    let temp = Math.floor(random / 3);
    let row = temp;

    temp = random % 3;
    let column = temp;

    if (board[row][column].length == 0) {
      board[row][column] = "O";

      cell[random].innerHTML = `<h3>${turn}</h3>`;
      return;
    }
  }
}
