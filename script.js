// modules: gameBoard, displayController
const gameBoard = (() => {
    const _boardArray = [0,0,0,0,0,0,0,0,0];

    const _winningPattern = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

    let player1;
    let player2;
    let currentPlayer;

    const startGame = () => {
        player1_name = document.getElementById('player1').value;
        player2_name = document.getElementById('player2').value;

        player1 = Player(player1_name, "X"); // create player 1
        player2 = Player(player2_name, "O"); // create player 2

        currentPlayer = player1;

        gameBoard.showAllMarkers();
        document.getElementsByClassName('setting')[0].style.display = "none";
        document.getElementsByClassName('status')[0].style.display = "block";
        document.getElementsByClassName('container')[0].style.display = "grid";
        document.getElementById('turnStatus').innerText = displayController.playersTurn(currentPlayer.getName);
    }

    const _switchPlayer = () => {
        if (currentPlayer == player1) {
            currentPlayer = player2;   
        } else {
            currentPlayer = player1;
        }
        document.getElementById('turnStatus').innerText = displayController.playersTurn(currentPlayer.getName);
    };

    const fillSpace = (position) => {
        if (_boardArray[position] != 0) {
            displayController.takenSpot;
        } else {
            _boardArray[position] = currentPlayer.getMarker;
            document.getElementById(`grid${position}`).innerText = _boardArray[position];
            _switchPlayer();
        }
    };

    const showAllMarkers = () => {
        for (let i = 0; i < _boardArray.length; i++){
            if (_boardArray[i] != 0){
                document.getElementById(`grid${i}`).innerText = _boardArray[i];
            };
        }
    }

    const _matchWinningPattern = (array) => {
        let [first, second, third] = array;
        if (_boardArray[first] != 0 && _boardArray[first] == _boardArray[second] && _boardArray[second] == _boardArray[third]) {
            return true
        } else {
            return false
        }
    }

    const checkWin = () => {
        if (_winningPattern.some(_matchWinningPattern)) {
            for (let i = 0; i < _boardArray.length; i++) {
                if (_boardArray[i] == 0) {
                    _boardArray[i] = 1;
                }
            }
            if (currentPlayer == player1) {
                document.getElementById('turnStatus').innerText = displayController.displayWinner(player2.getName, player2.getMarker);
            } else {
                document.getElementById('turnStatus').innerText = displayController.displayWinner(player1.getName, player1.getMarker);
            }
            document.getElementsByClassName('restart')[0].style.display = "flex";
        }
    };

    const checkTie = () => {
        if (!_boardArray.includes(0) && !_boardArray.includes(1) && !_winningPattern.some(_matchWinningPattern)) {
            document.getElementById('turnStatus').innerText = displayController.displayTie;
            document.getElementsByClassName('restart')[0].style.display = "flex";
        }
    }

    const restart = () => {
        location.reload();

    }

    return {
        startGame,
        showAllMarkers,
        fillSpace,
        checkWin,
        checkTie,
        restart
    };
})();

const displayController = (() => {

    const playersTurn = (name) => {
        return `It's ${name}'s turn now`;
    };

    const displayWinner = (name, marker) => {
        return `${name} (${marker}) wins!`
    }

    const displayTie = `It's a tie.`;
    
    const takenSpot = `This place is taken, pick another one.`;

    return {
        playersTurn,
        displayWinner,
        displayTie,
        takenSpot
    };
})();

// factories: players
const Player = (name, marker) => {
    const getName = name;
    const getMarker = marker;

    return {getName, getMarker}
};



document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
})

// Game flow
// gameBoard.showAllMarkers(); // empty form
// const player1 = Player("player1", "X"); // create player 1
// const player2 = Player("player2", "O"); // create player 2
// let currentPlayer = player1; // set first player