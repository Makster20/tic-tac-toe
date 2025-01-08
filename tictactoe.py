import keyboard
from random import randint

def print_board(board):
    for i, row in enumerate(board):
        row_str = ' '
        for j, col in enumerate(row):
            row_str += col
            if j != len(row) - 1:
                row_str += ' | '
        print(row_str)
        if i != len(board) - 1:
            print('------------')


def get_position(player):
    while True:
        position = input(f'Player {player}, enter the position that goes from left to right (1 - 9) ')
        if position.isdigit():
            position = int(position)
            if position and 1 <= position <= 9:
                return position        
            else:
                print('Please enter the numbers 1 - 9')
        else:
            print('Please enter a number')


def check_board(board):
    # Check if there is match in rows
    for i, r in enumerate(board):
        if board[i][0] != ' ':
            if board[i][0] == board[i][1] == board[i][2]:
                return f'{r[0]} wins'.lower()
    
    # Check if there is match in columns
    for x in range(3):
        col = []
        for i, r in enumerate(board):
            col.append(r[x])
        if col[0] == col[1] == col[2]:
            return f'{col[0]} wins'.lower()
        
    # Check if there is match in diagonals
    if board[0][0] == board[1][1] == board[2][2]:
        return f'{board[0][0]} wins'.lower()
    elif board[0][2] == board[1][1] == board[2][0]:
        return f'{board[0][2]} wins'.lower()

    # Check if board is full and no match
    counter = 0
    for i, r in enumerate(board):
        for j, c in enumerate(r):
            if r[j] != ' ':
                counter += 1
    if counter == 9:
        return 'draw'
    
    # There is no match, and its not a draw so return None
    return None


def computer_move(board):
    # Check in rows
    for i, r in enumerate(board):
        # Check if the first two columns in the row are 'X' and the third is empty
        if board[i][0] == 'X' and board[i][1] == 'X':
            if board[i][2] == ' ':
                board[i][2] = 'O'
                return

        # Check if the second and third columns in the row are 'X' and the first is empty
        elif board[i][2] == 'X' and board[i][1] == 'X':
            if board[i][0] == ' ':
                board[i][0] = 'O'
                return

    # Check in cols
    for x in range(3):
        col = []
        for i, r in enumerate(board):
            col.append(r[x])
        if col[0] == 'X' and col[1] == 'X':
            if board[2][x] == ' ':
                board[2][x] = 'O'
                return
    
    for x in range(3):
        col = []
        for i, r in enumerate(board):
            col.append(r[x])
        if col[2] == 'X' and col[1] == 'X':
            if board[0][x] == ' ':
                board[0][x] = 'O'
                return
    
    # Check in diagonals
    if board[0][0] == 'X' and board[1][1] == 'X':
        if board[2][2] == ' ':
            board[2][2] = 'O'
            return
    elif board[2][2] == 'X' and board[1][1] == 'X':
        if board[0][0] == ' ':
            board[0][0] = 'O'
            return
        
    elif board[0][2] == 'X' and board[1][1] == 'X':
        if board[2][0] == ' ':
            board[2][0] = 'O'
            return
    elif board[2][0] == 'X' and board[1][1] == 'X':
        if board[0][2] == ' ':
            board[0][2] = 'O'
            return
    
    random_computer(board)


def random_computer(board):
    while True:
        num1 = randint(0, 2)
        num2 = randint(0, 2)
        if board[num1][num2] == ' ':
            board[num1][num2] = 'O'
            return
        
def main():
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' '],
    ]
    player = 'X'

    print('Welcome!\nPress any key to start...')
    keyboard.read_event()
    while True:
        while True:
            mode = input('Do you want to play against computer? Or do you want to play with your friend?\n1 -> Computer\n2 -> Friend\n')
            if mode.isdigit():
                mode = int(mode)
                break
            print('Please enter a number')
        if mode == 1 or mode == 2:
            break
        else:
            print('Please enter 1 or 2 to choose the game mode')
            
    if mode == 1:
        while True:
            print_board(board)
            while True:
                position = get_position(player)
                if 1 <= position <= 3:
                    if board[0][position - 1] == ' ':
                        board[0][position - 1] = player
                        break
                    else:
                        print(f'{board[0][position - 1]} is already filled there')
                elif 4 <= position <= 6:
                    if board[1][position - 4] == ' ':
                        board[1][position - 4] = player
                        break
                    else:
                        print(f'{board[1][position - 4]} is already filled there')
                elif 7 <= position <= 9:
                    if board[2][position - 7] == ' ':
                        board[2][position - 7] = player
                        break
                    else:
                        print(f'{board[2][position - 7]} is already filled there')

            result = check_board(board)

            if result == 'x wins':
                print_board(board)
                print('X wins the game.')
                return
            elif result == 'o wins':
                print_board(board)
                print('O wins the game.')
                return
            elif result == 'draw':
                print_board(board)
                print('The game is a draw, no one wins.')
                return
            
            computer_move(board)

            result = check_board(board)

            if result == 'x wins':
                print_board(board)
                print('X wins the game.')
                return
            elif result == 'o wins':
                print_board(board)
                print('O wins the game.')
                return
            elif result == 'draw':
                print_board(board)
                print('The game is a draw, no one wins.')
                return

            
    elif mode == 2:
        while True:
            print_board(board)
            while True:
                    position = get_position(player)
                    if 1 <= position <= 3:
                        if board[0][position - 1] == ' ':
                            board[0][position - 1] = player
                            break
                        else:
                            print(f'{board[0][position - 1]} is already filled there')
                    elif 4 <= position <= 6:
                        if board[1][position - 4] == ' ':
                            board[1][position - 4] = player
                            break
                        else:
                            print(f'{board[1][position - 4]} is already filled there')
                    elif 7 <= position <= 9:
                        if board[2][position - 7] == ' ':
                            board[2][position - 7] = player
                            break
                        else:
                            print(f'{board[2][position - 7]} is already filled there')
        
            result = check_board(board)

            if result == 'x wins':
                print_board(board)
                print('X wins the game.')
                return
            elif result == 'o wins':
                print_board(board)
                print('O wins the game.')
                return
            elif result == 'draw':
                print_board(board)
                print('The game is a draw, no one wins.')
                return

            if player == 'X':
                player = 'O'
            else:
                player = 'X'

main()