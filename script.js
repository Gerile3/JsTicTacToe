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
                    return this.board[a]; // Return the marker ('X' or 'O') of the winner
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

const player1 = new Player("Ben", "X");
const player2 = new Player("Sen", "O");
let turnorder = [player1, player2];
let turnIndex = 0;

while (Gameboard.checkWinner() === null) {
    let currentPlayer = turnorder[turnIndex];
    let input = prompt(`It's ${currentPlayer.name}'s turn, where to put the marker? (Enter a number between 1-9)`);
    let position = parseInt(input) - 1;  // Subtract 1 to match the 0-based index

    if (!isNaN(position) && position >= 0 && position <= 8 && Gameboard.board[position] === "") {
        Gameboard.addMarker(currentPlayer.marker, position);
        console.log(Gameboard.showBoard());

        // Switch to the next player
        turnIndex = (turnIndex + 1) % 2;
    } else {
        console.log("Invalid input. Try again.");
    }
}



