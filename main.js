function Gameboard(){
    const gameboard = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' '],
    ];

    const getBoard = () => gameboard;

    

    return {
        getBoard,
    };
}


function Player(){

    // DOM elements
    const cover = document.querySelector('.cover');
    const againstChoices = document.querySelectorAll('.choices div');
    const againstPlayer2 = againstChoices[0];
    const againstComputer = againstChoices[1];
    const playButton = document.querySelector('.cover button');

    // Normal variables
    let opponent;

    let chooseOpponent = () => {
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
                }
            });
            cover.style.display = 'none';
        });
    }

    let getOpponent = () => opponent;

    return {
        chooseOpponent,
        getOpponent,
    }
}


function GameController(){

}


function ScreenController(){
    let player = Player();
    player.chooseOpponent();
    opponent = player.getOpponent();
    

}

ScreenController()