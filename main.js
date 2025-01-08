function Gameboard(){
    const gameboard = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' '],
    ];

    const getBoard = () => gameboard;

    const cells = document.querySelectorAll('.grid div')
    console.log(cells);
    

    return {
        getBoard,
    };
}


function Player(){
    const againstChoices = document.querySelectorAll('.choices div');
    const againstPlayer2 = againstChoices[0];
    const againstComputer = againstChoices[1];

    againstChoices.forEach((choice) => {
        choice.addEventListener('click', () => {
            
        });
    });
}


function GameController(){

}