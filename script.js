// modules: gameBoard, displayController
const gameBoard = (() => {
    const _boardArray = [0,0,0,0,0,0,0,0,0];

    const _winningPattern = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

    const _winningStatus = [false, false, false, false, false, false, false, false]

    const _switchPlayer = () => {
        if (currentPlayer == player1) {
            currentPlayer = player2;   
        } else {
            currentPlayer = player1;
        }
        document.getElementById('turnStatus').innerText = `It's ${currentPlayer.getMarker}'s turn now.`;
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

    // const checkWin = () => {
    //     for (let i = 0; i < _winningPattern.length; i++) {
    //         let [first, second, third] = _winningPattern[i];
    //         if (_boardArray[first] == _boardArray[second] && _boardArray[second] == _boardArray[third] && !_boardArray.includes(0)) {
    //             _winningStatus[i] = true;
    //         };
    //     };
    //     if (_winningStatus.includes(true)) {
    //         for (let i = 0; i < _boardArray.length; i++) {
    //             document.getElementById(`grid${i}`).addEventListener('click', (e) => {
    //                 e.preventDefault();
    //             });
    //         }
    //         document.getElementById('turnStatus').innerText = displayController.displayWinner(currentPlayer.getName);
    //     }
    // };

    return {
        showAllMarkers,
        fillSpace
    };
})();

const displayController = (() => {

    const playersTurn = (name) => {
        console.log(`It's ${name}'s turn now`);
    };

    const displayWinner = (name) => {
        `${name} wins!`
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


// Game flow
gameBoard.showAllMarkers(); // empty form
const player1 = Player("player1", "X"); // create player 1
const player2 = Player("player2", "O"); // create player 2
let currentPlayer = player1; // set first player