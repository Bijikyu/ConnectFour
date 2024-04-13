// This file contains the JavaScript code for a Connect Four game. It includes constants for display elements, audio files, application state variables, cached DOM element references, event listeners, render functions, and the initialization function.

/*-----------------------------------------1) Constants------------------------------------------*/

const DISPLAY = { // Object holding URLs for the empty, playerOne, and playerTwo cell background images
    empty: "url('https://imgur.com/vsLSXq0.png')",
    playerOne: "url('https://imgur.com/qSMQ9XE.png')",
    playerTwo: "url('https://imgur.com/CvBqm9R.png')"
}

const tokenDrop = new Audio('tokenDrop.mp3'); // Audio object for the token drop sound
const endGong = new Audio('endGong.flac'); // Audio object for the end gong sound

/*--------------------------------2) Application State (Variables)-------------------------------*/

let board = []; // Array representing the game board
let turn; // Variable to track the current player's turn
let winner; // Variable to track the winner of the game

/*---------------------------------3) Cached Element Referances----------------------------------*/

const topMsg = document.getElementById('topMsg'); // DOM reference to the top message element
const theDiv = document.getElementById('theDiv'); // DOM reference to the main game container
const replay = document.getElementById('replay'); // DOM reference to the replay button
const c4Hols = document.querySelectorAll('.c4Hol'); // NodeList of all game cell elements

/*-------------------------------------4) Event Listeners----------------------------------------*/

theDiv.addEventListener('click', holClk); // Adds click event listener to the main game container
replay.addEventListener('click', init); // Adds click event listener to the replay button

/*-------------------------------------6) Render Functions---------------------------------------*/

let champ; // Variable to store the champion's name
endGong.volume = 0.3; // Sets the volume for the end gong sound

function render(){ // Function to update the game's visual elements based on the current state
    if (winner !== null) replay.style.visibility = 'visible'; // Shows the replay button if there is a winner
    if (winner === 't') topMsg.innerText = 'It is a tie!'; // Sets the top message to indicate a tie
    if (winner === 'a' || winner === 'b'){ // Checks if there is a winner and sets the top message accordingly
        winner === 'a' ? champ = 'PLAYER 1' : champ = 'PLAYER 2';
        topMsg.innerText = `${champ} IS THE CHAMP!`;
        endGong.play(); // Plays the end gong sound
    }
    else if (winner !== 't') { // Updates the top message to indicate whose turn it is
        turn === 'a' ? topMsg.innerText = 'Player 1 it is your turn...' : topMsg.innerText = 'Player 2 it is your turn...';
    }
    c4Hols.forEach(function(hol, idx) { // Iterates over each game cell to update its background image
        if (board[idx] === 'empty'){ // Sets the background image to empty if the cell is empty
            (hol).style.backgroundImage = DISPLAY.empty;
        }
        else if (board[idx] === 'a') { // Sets the background image to playerOne if the cell is occupied by player 'a'
            (hol).style.backgroundImage = DISPLAY.playerOne;
        }
        else { // Sets the background image to playerTwo if the cell is occupied by player 'b'
            (hol).style.backgroundImage = DISPLAY.playerTwo;
        }
        if ((board[idx] === 'a' || board[idx] === 'b') && idx >= 7) { // Makes the cell above visible if the current cell is occupied
            let itemAbove = idx - 7;
            c4Hols[itemAbove].style.visibility = 'visible';
        }
    })
}

/*------------------------------------------Functions--------------------------------------------*/

tokenDrop.volume = 0.3; // Sets the volume for the token drop sound

function holClk(evt){ // Function to handle click events on the game cells
    console.log(evt); // Logs the event object to the console
    let holIdx = evt.target.id.replace('hol',''); // Extracts the index of the clicked cell from its ID
    if (board[holIdx] !== 'empty') return; // Exits the function if the clicked cell is not empty
    tokenDrop.play(); // Plays the token drop sound
    if (winner !== null) return; // Exits the function if there is already a winner
    turn === 'a' ? board[holIdx] = 'a' : board[holIdx] = 'b'; // Updates the board array with the current player's token
    turn === 'a' ? turn = 'b' : turn = 'a'; // Switches the turn to the other player
    // The following lines create strings representing each row and column of the board, as well as diagonals, to check for a winner
    let row1 = board[0] + board[1] + board[2] + board[3] + board[4] + board[5] + board[6];
    // ... (similar code for row2 through row6 and col1 through col7 and diagonals riseLt1 through riseRt6)
    let searchableArray = [row6, row5, row4, row3, row2, row1, col4, col3, col5, col2, col6, col1, col7, riseLt1, riseRt6, riseLt2, riseRt5, riseLt3, riseRt4, riseLt4, riseRt3, riseLt5, riseRt2, riseLt6, riseRt1]; // Array of all lines to search for a winner
    searchableArray.forEach(function(line){ // Iterates over each line to check for a winning sequence
        if (line.search('aaaa') !== -1) winner = 'a'; // Sets the winner to 'a' if four 'a's are found in a line
        if (line.search('bbbb') !== -1) winner = 'b'; // Sets the winner to 'b' if four 'b's are found in a line
    })
    if (board.includes('empty') === false) winner = 't'; // Sets the winner to 't' if the board is full and there is no winner
    render(); // Calls the render function to update the game's visual state
}

/*--------------------------------------5) Init function-----------------------------------------*/

function init(){ // Function to initialize the game
    replay.style.visibility = 'hidden'; // Hides the replay button
    for (i=0; i < 42; i++){ // Clears the board array
        board.pop();
    }
    for (i=0; i < 42; i++){ // Fills the board array with 'empty'
        board.push('empty');
    }
    let hidden = board.slice(0,35); // Creates a slice of the board array for the hidden cells
    c4Hols.forEach(function(hol, idx) { // Iterates over each game cell to set its visibility
        if (hidden[idx] === 'empty') {
            (hol).style.visibility = 'hidden';
        }
    })
    turn = 'a'; // Sets the turn to player 'a'
    winner = null; // Resets the winner to null
    render(); // Calls the render function to update the game's visual state
}
init(); // Calls the init function to start the game