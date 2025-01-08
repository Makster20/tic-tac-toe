function Gameboard(){

    // DOM elements
    const cells = document.querySelectorAll('.grid div');

    const gameboard = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' '],
    ];

    const getCellPosition = cellClassNo => {
        const row = Math.floor(cellClassNo / 3); // Calculate row index
        const col = cellClassNo % 3;            // Calculate column index
        return gameboard[row][col];
    }

    const getBoard = () => gameboard;

    const addMark = currentPlayer => {
        cells.forEach(cell => {
            cell.addEventListener('click', cell => {
                if(currentPlayer == 'player1'){
                    cell.innerHTML = '<img src="cross.svg" alt="" class="cross">';
                    let gameboardCell = getCellPosition(cell.classList[0]);
                    gameboardCell = 'X';
                }
                else if(currentPlayer == 'player2'){
                    cell.innerHTML = '<img src="circle.svg" alt="" class="circle">';
                    let gameboardCell = getCellPosition(cell.classList[0]);
                    gameboardCell = 'O';
                }
            });
        });
    }

    return {
        getBoard,
        getCellPosition,
        addMark,
    };
}


function Player(){

    // DOM elements
    const cover = document.querySelector('.cover');
    const againstChoices = document.querySelectorAll('.choices div');
    const againstPlayer2 = againstChoices[0];
    const againstComputer = againstChoices[1];
    const playButton = document.querySelector('.cover button');
    const error = document.querySelector('.cover h2')

    let opponent;

    const chooseOpponent = () => {
        // Select opponent
        againstPlayer2.addEventListener('click', () => {
            againstPlayer2.style.backgroundColor = 'darkblue';
            againstPlayer2.style.color = 'white';
            againstPlayer2.classList.add('clicked');

            if(againstPlayer2.style.backgroundColor == 'darkblue' && againstComputer.style.color == 'white'){
                againstComputer.style.backgroundColor = 'white';
                againstComputer.style.color = 'darkblue';

                againstComputer.classList.remove('clicked');
            }
        })

        againstComputer.addEventListener('click', () => {
            againstComputer.style.backgroundColor = 'darkblue';
            againstComputer.style.color = 'white';
            againstComputer.classList.add('clicked');

            if(againstComputer.style.backgroundColor == 'darkblue' && againstComputer.style.color == 'white'){
                againstPlayer2.style.backgroundColor = 'white';
                againstPlayer2.style.color = 'darkblue';

                againstPlayer2.classList.remove('clicked');
            }
        })

        playButton.addEventListener('click', () => {
            againstChoices.forEach(choice => {
                if(choice.classList.contains('clicked')){
                    opponent = choice.classList[0];
                    error.style.color = 'rgba(255, 255, 255, 0)';
                    cover.style.display = 'none';
                }
                else{
                    error.style.color = 'rgba(255, 255, 255, 1)';
                    // Force reflow to re-trigger animation
                    error.classList.remove('shake'); // Remove the class
                    void error.offsetWidth; // Trigger reflow
                    error.classList.add('shake'); // Re-add the class
                }
            });
        });
    }

    const getOpponent = () => opponent;

    return {
        chooseOpponent,
        getOpponent,
    }
}


function GameController(){

}


function ScreenController(){
    let gameboard = Gameboard();
    let player = Player();
    let gamecontroller = GameController();
    
    player.chooseOpponent();
    opponent = player.getOpponent();
    

}

ScreenController()