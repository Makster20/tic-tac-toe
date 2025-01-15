function GameBoard(){

    const gameboard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]

    const getGameboard = () => gameboard;

    return {getGameboard};

}


function Player(){

    const getRandomNumber = () => {
        return Math.floor(Math.random() * 3);
    }
    
    const chooseOpponent = opponent => {
        if (opponent === 'human'){
            return 'human';
        } 
        else if (opponent === 'computer'){
            return 'computer';
        }
    }

    const humanAddMark = (gameboard, cellPositionNo, player) => {
        const row = Math.floor(cellPositionNo / 3); // Calculate row index
        const col = cellPositionNo % 3;            // Calculate column index

        if (gameboard[row][col] !== ''){
            return Error('Position is full already.')
        }

        if (player === 'X'){
            gameboard[row][col] = 'X';
        }
        else if (player === 'O'){
            gameboard[row][col] = 'O';
        }
        return;
    }
    

    const computerAddMark = gameboard => {
       
        // Copy gameboard to oldGameboard to check which position has been changed
        let oldGameboard = JSON.parse(JSON.stringify(gameboard)); // Deep copy

        // Rows
        for (let row of gameboard){
            if (row[0] === 'X' && row[1] === 'X'){
                if (row[2] === ''){
                    row[2] = 'O';
                    return getComputerPosition(oldGameboard, gameboard);
                }
            }
            else if (row[2] === 'X' && row[1] === 'X'){
                if (row[0] === ''){
                    row[0] = 'O';

                    return getComputerPosition(oldGameboard, gameboard);
                }
            }
        }
        // Columns
        for (i = 0; i < 3; i++){
            col = [];
            for (let row of gameboard){
                col.push(row[i])
            }
            if (col[0] === 'X' && col[1] === 'X'){
                if (col[2] === ''){
                    gameboard[i][2] = 'O';
                    return getComputerPosition(oldGameboard, gameboard);
                }
            }
        }

        for (i = 0; i < 3; i++){
            col = [];
            for (let row of gameboard){
                col.push(row[i])
            }
            if (col[2] === 'X' && col[1] === 'X'){
                if (col[0] === ''){
                    gameboard[i][0] = 'O';
                    return getComputerPosition(oldGameboard, gameboard);
                }
            }
        }
        
        // Diagonals
        if (gameboard[0][0] === 'X' && gameboard[1][1] === 'X'){
            if (gameboard[2][2] === ''){
                gameboard[2][2] = 'O';
                return getComputerPosition(oldGameboard, gameboard);
            }
        } 
        else if (gameboard[2][2] === 'X' && gameboard[1][1] === 'X'){
            if (gameboard[0][0] === ''){
                gameboard[0][0] = 'O';
                return getComputerPosition(oldGameboard, gameboard);
            }
        } 
        else if (gameboard[0][2] === 'X' && gameboard[1][1] === 'X'){
            if (gameboard[2][0] === ''){
                gameboard[2][0] = 'O';
                return getComputerPosition(oldGameboard, gameboard);
            }
        } 
        else if (gameboard[2][0] === 'X' && gameboard[1][1] === 'X'){
            if (gameboard[0][2] === ''){
                gameboard[0][2] = 'O';
                return getComputerPosition(oldGameboard, gameboard);
            }
        } 
        return randomComputerAddMark(oldGameboard, gameboard)

    }


    const randomComputerAddMark = (oldGameboard, newGameboard) => {

        while (true){
            let num1 = getRandomNumber();
            let num2 = getRandomNumber();
            if (newGameboard[num1][num2] === ''){
                newGameboard[num1][num2] = 'O';
                return getComputerPosition(oldGameboard, newGameboard);
            }
            
        }
    }


    const getComputerPosition = (oldGameboard, newGameboard) => {
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (oldGameboard[i][j] !== newGameboard[i][j]){
                    return ((i * 3) + j) + 1;
                }
            }
        }
        return;
    }

    return {chooseOpponent, humanAddMark, computerAddMark, randomComputerAddMark, getComputerPosition};

}



function GameController(){

    let player = Player();

    const logGameboard = gameboard => {
        let gameboardStr = '';
        for (row of gameboard){
            for (col of row){
                gameboardStr += col + ' | ';
            }
            gameboardStr += '\n';
        }            
        console.log(gameboardStr);
        return;
                      
    }   

    const checkWinner = gameboard => {
        // Check if rows match
        for (let row of gameboard){
            if (row[0] === row[1] && row[1] === row[2]){
                if (row[0] === 'X'){
                    return 'player1 wins';
                }
                else if (row[0] === 'O'){
                    return 'player2 wins';
                }
            }
        }

        // Check if cols match
        for (let i = 0; i < 3; i++){
            col = [];
            for (let row of gameboard){
                col.push(row[i])
            }
            if (col[0] === col[1] && col[1] === col[2]){
                if (col[0] === 'X'){
                    return 'player1 wins';
                }
                else if (col[0] === 'O'){
                    return 'player2 wins';
                }
            }
        }

        // Check if diagonals match
        if (gameboard[0][0] === gameboard[1][1] && gameboard[1][1] === gameboard[2][2]){
            if (gameboard[0][0] === 'X'){
                return 'player1 wins';
            }
            else if (gameboard[0][0] === 'O'){
                return 'player2 wins';
            }
        }
        else if (gameboard[0][2] === gameboard[1][1] && gameboard[1][1] === gameboard[2][0]){
            if (gameboard[0][2] === 'X'){
                return 'player1 wins';
            }
            else if (gameboard[0][2] === 'O'){
                return 'player2 wins';
            }
        }

        // Check if board is full and its a draw
        let counter = 0;
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (gameboard[i][j] === ''){
                    counter++;
                }
            }
        }
        if (counter === 9){
            return 'draw';
        }

        // There is no match, and since the gameboard is not full (the game is not finished), we will return undefined
        return undefined;

    }



    return {logGameboard, checkWinner};

}

function ScreenController(){
    let gameboard = GameBoard().getGameboard();
    let player = Player();
    let game = GameController(); 

    // DOM Elements 
    const cover = document.querySelector('.cover');
    const shakeText = document.querySelector('.shake');
    const opponentChoices = document.querySelectorAll('.choices div');
    const playerOpponent = document.querySelector('.player2');
    const computerOpponent = document.querySelector('.computer');
    const playButton = document.querySelector('.play');
    const grid = document.querySelector('.grid');
    const gridCells = document.querySelectorAll('.grid div');

    // Select opponent
    let opponent;

    playerOpponent.addEventListener('click', () => {
        playerOpponent.style.backgroundColor = 'darkblue';
        playerOpponent.style.color = 'white';
        playerOpponent.classList.add('clicked');

        if(playerOpponent.style.backgroundColor == 'darkblue' && computerOpponent.style.color == 'white'){
            computerOpponent.style.backgroundColor = 'white';
            computerOpponent.style.color = 'darkblue';

            computerOpponent.classList.remove('clicked');
        }
    })

    computerOpponent.addEventListener('click', () => {
        computerOpponent.style.backgroundColor = 'darkblue';
        computerOpponent.style.color = 'white';
        computerOpponent.classList.add('clicked');

        if(computerOpponent.style.backgroundColor == 'darkblue' && playerOpponent.style.color == 'white'){
            playerOpponent.style.backgroundColor = 'white';
            playerOpponent.style.color = 'darkblue';

            playerOpponent.classList.remove('clicked');
        }
    })

    playButton.addEventListener('click', () => {
        opponentChoices.forEach(choice => {
            if(choice.classList.contains('clicked')){
                opponent = choice.classList[0];
                shakeText.style.color = 'rgba(255, 255, 255, 0)';
                cover.style.display = 'none';
            }
            else{
                shakeText.style.color = 'rgba(255, 255, 255, 1)';
                // Force reflow to re-trigger animation
                shakeText.classList.remove('shake'); // Remove the class
                void shakeText.offsetWidth; // Trigger reflow
                shakeText.classList.add('shake'); // Re-add the class
            }
        });
        console.log(opponent);
        
    });

    let playerTurn = 'X';
    gridCells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (playerTurn === 'X'){
                let cellPositionNo = cell.classList[0] - 1;
                let result = player.humanAddMark(gameboard, cellPositionNo, playerTurn) 
                if (result instanceof Error){
                    console.log('place taken')
                }
                else{
                    cell.innerHTML = '<img src="cross.svg" alt="" class="cross">';

                    playerTurn = 'O';
                    
                    if (opponent === 'computer'){
                    let cellPosition = player.computerAddMark(gameboard);
                    console.log(cellPosition)
                    let computerCell = document.getElementsByClassName(cellPosition)[0];
                    computerCell.innerHTML = '<img src="circle.svg" alt="" class="circle">';

                    playerTurn = 'X';
                    game.logGameboard(gameboard)
                }
                }

                
            }
            else if (playerTurn === 'O'){
                let cellPositionNo = cell.classList[0] - 1;
                if (opponent === 'player2'){
                    let result = player.humanAddMark(gameboard, cellPositionNo, playerTurn) 
                    if (result instanceof Error){
                        console.log('place taken')
                    }
                    else{
                    cell.innerHTML = '<img src="circle.svg" alt="" class="circle">';

                    playerTurn = 'X';
                    game.logGameboard(gameboard)
                    }
                }
                else if (opponent === 'computer'){
                    player.computerAddMark(gameboard);
                    cell.innerHTML = '<img src="circle.svg" alt="" class="circle">';

                    playerTurn = 'X';
                    game.logGameboard(gameboard)
                }

                
            }
        });

    });
    

    // // Testing in console, player vs computer
    // player.humanAddMark(gameboard, 0, 'X');
    // player.computerAddMark(gameboard);
    // game.logGameboard(gameboard);

    // player.humanAddMark(gameboard, 1, 'X');
    // player.computerAddMark(gameboard);
    // game.logGameboard(gameboard);

    // player.humanAddMark(gameboard, 2, 'X');
    // player.computerAddMark(gameboard);
    // game.logGameboard(gameboard);


    // result = game.checkWinner(gameboard);
    // console.log(result)
    // if (result === 'player1 wins'){
    //     console.log('p1')
    // }
    // else if (result === 'player2 wins'){
    //     console.log('p2')
    // }
    // else if (result === 'draw'){
    //     console.log('draw')
    // }
    // else{
    //     console.log('ez')
    // }
}

ScreenController();