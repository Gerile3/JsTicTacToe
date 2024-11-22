function Player(name, marker){
    this.name = name;
    this.marker = marker;
}

const Gameboard = (function(){
    function Gameboard(){
        this.board = ["","","",
                      "","","",
                      "","",""];
        this.showBoard = function(){
            return this.board
        }
        this.addMarker = function(marker, position) {
            if (this.board[position] === "") {
                this.board.splice(position, 1, marker);
                
                const winner = this.checkWinner();
                
                if (winner) {
                    if (winner === "tie") {
                        console.log("It's a tie!");
                    } else {
                        console.log(`${winner} wins!`);
                    }
                    return;
                }
            } else {
                console.log("This spot is already taken!");
            }
        }
        this.cleanBoard = function(){
            this.board = ["","","",
                          "","","",
                          "","",""];
        }
        this.checkWinner = function() {
            const winConditions = [
                // Horizontal win conditions
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                // Vertical win conditions
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                // Diagonal win conditions
                [0, 4, 8],
                [2, 4, 6]
            ];
    
            for (let condition of winConditions) {
                const [a, b, c] = condition;
                if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                    return this.board[a];
                }
            }

            if (!this.board.includes("")) {
                return "tie";
            }
            return null;
        };
    }
    return new Gameboard();
})();

const startButton = document.querySelector(".start-button");
const currentTurn = document.querySelector(".player-turn");
const boardTiles = document.querySelectorAll(".board-tile");
const player1 = new Player("Player1", "X");
const player2 = new Player("Player2", "O");

let gameStart = false;
let turnorder = [player1, player2];
let turnIndex = 0;

function updateTurnDisplay() {
    const currentPlayer = turnorder[turnIndex];
    currentTurn.textContent = `It's ${currentPlayer.name}'s turn!`;
}

boardTiles.forEach((tile, index) => {
    tile.addEventListener("click", () => {

        if (gameStart){
            const currentPlayer = turnorder[turnIndex];
            if (Gameboard.board[index] === "") {
                Gameboard.addMarker(currentPlayer.marker, index);
                tile.textContent = currentPlayer.marker;
                startButton.textContent = "Reset"

                const winner = Gameboard.checkWinner();
                if (winner) {

                    if (!Gameboard.board.includes("")) {
                        currentTurn.textContent = "It's a tie!";
                        return;
                    }

                    currentTurn.textContent = `${currentPlayer.name} wins!`;
                    gameStart = false;
                    return;
                }

                turnIndex = (turnIndex + 1) % 2;
                updateTurnDisplay();
            } else {
                console.log("Tile already occupied! Choose another.");
            }
    }
    });
});

startButton.addEventListener("click", () => {
    gameStart = true;
    Gameboard.cleanBoard();
    boardTiles.forEach((tile) => (tile.textContent = ""));
    turnIndex = 0;
    updateTurnDisplay();
});

