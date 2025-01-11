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

    const humanLogic = (gameboard, cellPositionNo) => {
        const row = Math.floor(cellPositionNo / 3); // Calculate row index
        const col = cellPositionNo % 3;            // Calculate column index
        return gameboard[row][col];
    }

    const computerLogic = gameboard => {
        // Rows
        for (let row of gameboard){
            if (row[0] === 'X' && row[1] === 'X'){
                if (row[2] === ''){
                    row[2] = 'O';
                    return;
                }
            }
            else if (row[2] === 'X' && row[1] === 'X'){
                if (row[0] === ''){
                    row[0] = 'O';
                    return;
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
                    return;
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
                    return;
                }
            }
        }

        // Diagonals
        if (gameboard[0][0] === 'X' && gameboard[1][1] === 'X'){
            if (gameboard[2][2] === ''){
                gameboard[2][2] = 'O';
                return;
            }
        } 
        else if (gameboard[2][2] === 'X' && gameboard[1][1] === 'X'){
            if (gameboard[0][0] === ''){
                gameboard[0][0] = 'O';
                return;
            }
        } 
        else if (gameboard[0][2] === 'X' && gameboard[1][1] === 'X'){
            if (gameboard[2][0] === ''){
                gameboard[2][0] = 'O';
                return;
            }
        } 
        else if (gameboard[2][0] === 'X' && gameboard[1][1] === 'X'){
            if (gameboard[0][2] === ''){
                gameboard[0][2] = 'O';
                return;
            }
        } 

        randomComputerLogic(gameboard);
    }


    const randomComputerLogic = gameboard => {
        while (true){
            num1 = getRandomNumber();
            num2 = getRandomNumber();
            if (gameboard[num1][num2] === ''){
                gameboard[num1][num2] = 'O';
                return;
            }
            
        }
    }

    return {chooseOpponent, humanLogic, computerLogic, randomComputerLogic};

}


function GameController(){

    const logGameboard = gameboard => {
        let gameboardStr = '';
        for (row of gameboard){
            for (col of row){
                gameboardStr += col + ' | ';
            }
            gameboardStr += '\n';
        }            
        return gameboardStr               
    }   

    const player1Turn = () => {

    }

    const player2Turn = () => {

    }
    return {logGameboard, player1Turn, player2Turn};

}

function ScreenController(){



}

ScreenController()