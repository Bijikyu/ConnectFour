// This file contains the code for a Connect Four game, including constants, application state, cached element references, event listeners, render functions, and initialization.

/*-----------------------------------------1) Constants------------------------------------------*/

const DISPLAY = { // Object containing URLs for the images representing empty, player one, and player two states
    empty: "url('https://imgur.com/vsLSXq0.png')",
    playerOne: "url('https://imgur.com/qSMQ9XE.png')",
    playerTwo: "url('https://imgur.com/CvBqm9R.png')"
}

const tokenDrop = new Audio('tokenDrop.mp3'); // Creates a new audio object for the token drop sound
const endGong = new Audio('endGong.flac'); // Creates a new audio object for the end gong sound

/*--------------------------------2) Application State (Variables)-------------------------------*/

let board = []; // Array representing the game board
let turn; // Variable to track whose turn it is
let winner; // Variable to track the winner of the game

/*---------------------------------3) Cached Element Referances----------------------------------*/

const topMsg = document.getElementById('topMsg'); // Caches the top message element
const theDiv = document.getElementById('theDiv'); // Caches the div element where the game is played
const replay = document.getElementById('replay'); // Caches the replay button element
const c4Hols = document.querySelectorAll('.c4Hol'); // Caches all elements with the class 'c4Hol'

/*-------------------------------------4) Event Listeners----------------------------------------*/

theDiv.addEventListener('click', holClk); // Adds a click event listener to theDiv that calls holClk function
replay.addEventListener('click', init); // Adds a click event listener to the replay button that calls init function

/*-------------------------------------6) Render Functions---------------------------------------*/

let champ; // Variable to store the champion's name
endGong.volume = 0.3; // Sets the volume of the end gong sound to 0.3

function render(){ // Function to update the UI based on the current game state
    if (winner !== null) replay.style.visibility = 'visible'; // Makes the replay button visible if there is a winner
    if (winner === 't') topMsg.innerText = 'It is a tie!'; // Sets the top message to indicate a tie if winner is 't'
    if (winner === 'a' || winner === 'b'){ // Checks if the winner is player 'a' or 'b'
        winner === 'a' ? champ = 'PLAYER 1' : champ = 'PLAYER 2'; // Sets champ to 'PLAYER 1' or 'PLAYER 2' based on winner
        topMsg.innerText = `${champ} IS THE CHAMP!`; // Updates the top message to show the champion
        endGong.play(); // Plays the end gong sound
    }
    else if (winner !== 't') { // If there is no winner and it's not a tie, update the top message to indicate whose turn it is
        turn === 'a' ? topMsg.innerText = 'Player 1 it is your turn...' : topMsg.innerText = 'Player 2 it is your turn...';
    }
    c4Hols.forEach(function(hol, idx) { // Iterates over each hole in the game board
        if (board[idx] === 'empty'){ // If the board at index idx is 'empty', set the background image to DISPLAY.empty
            (hol).style.backgroundImage = DISPLAY.empty;
        }
        else if (board[idx] === 'a') { // If the board at index idx is 'a', set the background image to DISPLAY.playerOne
            (hol).style.backgroundImage = DISPLAY.playerOne;
        }
        else { // If the board at index idx is 'b', set the background image to DISPLAY.playerTwo
            (hol).style.backgroundImage = DISPLAY.playerTwo;
        }
        if ((board[idx] === 'a' || board[idx] === 'b') && idx >= 7) { // If the board at index idx is 'a' or 'b' and the index is greater than or equal to 7
            let itemAbove = idx - 7; // Calculate the index of the item above
            c4Hols[itemAbove].style.visibility = 'visible'; // Make the hole above visible
        }
    })
}

/*------------------------------------------Functions--------------------------------------------*/

tokenDrop.volume = 0.3; // Sets the volume of the token drop sound to 0.3

function holClk(evt){ // Function to handle click events on the game board
    console.log(evt); // Logs the event object to the console
    let holIdx = evt.target.id.replace('hol',''); // Extracts the hole index from the clicked element's id
    if (board[holIdx] !== 'empty') return; // If the clicked hole is not empty, return and do nothing
    tokenDrop.play(); // Plays the token drop sound
    if (winner !== null) return; // If there is already a winner, return and do nothing
    turn === 'a' ? board[holIdx] = 'a' : board[holIdx] = 'b'; // Sets the board at the clicked index to 'a' or 'b' based on whose turn it is
    turn === 'a' ? turn = 'b' : turn = 'a'; // Switches turns between 'a' and 'b'
    // The following lines create strings representing each row and column of the board, as well as diagonal lines
    let row1 = board[0] + board[1] + board[2] + board[3] + board[4] + board[5] + board[6];
    let row2 = board[7] + board[8] + board[9] + board[10] + board[11] + board[12] + board[13];
    let row3 = board[14] + board[15] + board[16] + board[17] + board[18] + board[19] + board[20];
    let row4 = board[21] + board[22] + board[23] + board[24] + board[25] + board[26] + board[27];
    let row5 = board[28] + board[29] + board[30] + board[31] + board[32] + board[33] + board[34];
    let row6 = board[35] + board[36] + board[37] + board[38] + board[39] + board[40] + board[41];
    let col1 = board[0] + board[7] + board[14] + board[21] + board[28] + board[35];
    let col2 = board[1] + board[8] + board[15] + board[22] + board[29] + board[36];
    let col3 = board[2] + board[9] + board[16] + board[23] + board[30] + board[37];
    let col4 = board[3] + board[10] + board[17] + board[24] + board[31] + board[38];
    let col5 = board[4] + board[11] + board[18] + board[25] + board[32] + board[39];
    let col6 = board[5] + board[12] + board[19] + board[26] + board[33] + board[40];
    let col7 = board[6] + board[13] + board[20] + board[27] + board[34] + board[41];
    let riseLt1 = board[14] + board[22] + board[30] + board[38];
    let riseLt2 = board[7] + board[15] + board[23] + board[31] + board[39];
    let riseLt3 = board[0] + board[8] + board[16] + board[24] + board[32] + board[40];
    let riseLt4 = board[1] + board[9] + board[17] + board[25] + board[33] + board[41];
    let riseLt5 = board[2] + board[10] + board[18] + board[26] + board[34];
    let riseLt6 = board[3] + board[11] + board[19] + board[27];
    let riseRt1 = board[21] + board[15] + board[9] + board[3];
    let riseRt2 = board[28] + board[22] + board[16] + board[10] + board[4];
    let riseRt3 = board[35] + board[29] + board[23] + board[17] + board[11] + board[5];
    let riseRt4 = board[36] + board[30] + board[24] + board[18] + board[12] + board[6];
    let riseRt5 = board[37] + board[31] + board[25] + board[19] + board[13];
    let riseRt6 = board[38] + board[32] + board[26] + board[20];
    let searchableArray = [row6, row5, row4, row3, row2, row1, col4, col3, col5, col2, col6, col1, col7, riseLt1, riseRt6, riseLt2, riseRt5, riseLt3, riseRt4, riseLt4, riseRt3, riseLt5, riseRt2, riseLt6, riseRt1]; // Array containing all lines to be searched for a win
    searchableArray.forEach(function(line){ // Iterates over each line in the searchableArray
        if (line.search('aaaa') !== -1) winner = 'a'; // If four 'a's are found in a line, set winner to 'a'
        if (line.search('bbbb') !== -1) winner = 'b'; // If four 'b's are found in a line, set winner to 'b'
    })
    if (board.includes('empty') === false) winner = 't'; // If there are no empty spaces and no winner, set winner to 't' for tie
    render(); // Calls the render function to update the UI
}

/*--------------------------------------5) Init function-----------------------------------------*/

function init(){ // Function to initialize the game
    replay.style.visibility = 'hidden'; // Hides the replay button
    for (i=0; i < 42; i++){ // Loop to clear the board array
        board.pop(); // Removes the last element from the board array
    }
    for (i=0; i < 42; i++){ // Loop to fill the board array with 'empty'
        board.push('empty'); // Adds 'empty' to the board array
    }
    let hidden = board.slice(0,35); // Creates a slice of the board array containing the first 35 elements
    c4Hols.forEach(function(hol, idx) { // Iterates over each hole in the game board
        if (hidden[idx] === 'empty') { // If the element in the hidden array is 'empty'
            (hol).style.visibility = 'hidden'; // Hides the hole
        }
    })
    turn = 'a'; // Sets the turn to 'a' to start the game
    winner = null; // Resets the winner to null
    render(); // Calls the render function to update the UI
}
init(); // Calls the init function to start the game

/*-----------------------------------------1) Constants------------------------------------------*/

const DISPLAY = {
    empty: "url('https://imgur.com/vsLSXq0.png')",
    playerOne: "url('https://imgur.com/qSMQ9XE.png')",
    playerTwo: "url('https://imgur.com/CvBqm9R.png')"
}

const tokenDrop = new Audio('tokenDrop.mp3');
const endGong = new Audio('endGong.flac');

/*--------------------------------2) Application State (Variables)-------------------------------*/

let board = [];
let turn;
let winner;

/*---------------------------------3) Cached Element Referances----------------------------------*/

const topMsg = document.getElementById('topMsg');
const theDiv = document.getElementById('theDiv');
const replay = document.getElementById('replay');
const c4Hols = document.querySelectorAll('.c4Hol');

/*-------------------------------------4) Event Listeners----------------------------------------*/

theDiv.addEventListener('click', holClk);
replay.addEventListener('click', init);

/*-------------------------------------6) Render Functions---------------------------------------*/

let champ;
endGong.volume = 0.3;

function render(){
    if (winner !== null) replay.style.visibility = 'visible';
    if (winner === 't') topMsg.innerText = 'It is a tie!';
    if (winner === 'a' || winner === 'b'){
        winner === 'a' ? champ = 'PLAYER 1' : champ = 'PLAYER 2';
        topMsg.innerText = `${champ} IS THE CHAMP!`;
        endGong.play();
    }
    else if (winner !== 't') {
        turn === 'a' ? topMsg.innerText = 'Player 1 it is your turn...' : topMsg.innerText = 'Player 2 it is your turn...';
    }
    c4Hols.forEach(function(hol, idx) {
        if (board[idx] === 'empty'){
            (hol).style.backgroundImage = DISPLAY.empty;
        }
        else if (board[idx] === 'a') {
            (hol).style.backgroundImage = DISPLAY.playerOne;
        }
        else {
            (hol).style.backgroundImage = DISPLAY.playerTwo;
        }
        if ((board[idx] === 'a' || board[idx] === 'b') && idx >= 7) {
            let itemAbove = idx - 7;
            c4Hols[itemAbove].style.visibility = 'visible';
        }
    })
}

/*------------------------------------------Functions--------------------------------------------*/

tokenDrop.volume = 0.3;

function holClk(evt){
    console.log(evt);
    /* 
    if 
    ((evt.elementFromPoint(x1) to evt.elementFromPoint(x2))is clicked){
        document.elementFromPoint(x, y).click();
        document.elementFromPoint(x, y).click();
        document.elementFromPoint(x, y).click();
        document.elementFromPoint(x, y).click();
        document.elementFromPoint(x, y).click();
        document.elementFromPoint(x, y).click();
        document.elementFromPoint(x, y).click();      
    }*/
    let holIdx = evt.target.id.replace('hol','');
    if (board[holIdx] !== 'empty') return;
    tokenDrop.play();
    if (winner !== null) return;
    turn === 'a' ? board[holIdx] = 'a' : board[holIdx] = 'b';
    turn === 'a' ? turn = 'b' : turn = 'a';
    let row1 = board[0] + board[1] + board[2] + board[3] + board[4] + board[5] + board[6];
    let row2 = board[7] + board[8] + board[9] + board[10] + board[11] + board[12] + board[13];
    let row3 = board[14] + board[15] + board[16] + board[17] + board[18] + board[19] + board[20];
    let row4 = board[21] + board[22] + board[23] + board[24] + board[25] + board[26] + board[27];
    let row5 = board[28] + board[29] + board[30] + board[31] + board[32] + board[33] + board[34];
    let row6 = board[35] + board[36] + board[37] + board[38] + board[39] + board[40] + board[41];
    let col1 = board[0] + board[7] + board[14] + board[21] + board[28] + board[35];
    let col2 = board[1] + board[8] + board[15] + board[22] + board[29] + board[36];
    let col3 = board[2] + board[9] + board[16] + board[23] + board[30] + board[37];
    let col4 = board[3] + board[10] + board[17] + board[24] + board[31] + board[38];
    let col5 = board[4] + board[11] + board[18] + board[25] + board[32] + board[39];
    let col6 = board[5] + board[12] + board[19] + board[26] + board[33] + board[40];
    let col7 = board[6] + board[13] + board[20] + board[27] + board[34] + board[41];
    let riseLt1 = board[14] + board[22] + board[30] + board[38];
    let riseLt2 = board[7] + board[15] + board[23] + board[31] + board[39];
    let riseLt3 = board[0] + board[8] + board[16] + board[24] + board[32] + board[40];
    let riseLt4 = board[1] + board[9] + board[17] + board[25] + board[33] + board[41];
    let riseLt5 = board[2] + board[10] + board[18] + board[26] + board[34];
    let riseLt6 = board[3] + board[11] + board[19] + board[27];
    let riseRt1 = board[21] + board[15] + board[9] + board[3];
    let riseRt2 = board[28] + board[22] + board[16] + board[10] + board[4];
    let riseRt3 = board[35] + board[29] + board[23] + board[17] + board[11] + board[5];
    let riseRt4 = board[36] + board[30] + board[24] + board[18] + board[12] + board[6];
    let riseRt5 = board[37] + board[31] + board[25] + board[19] + board[13];
    let riseRt6 = board[38] + board[32] + board[26] + board[20];
    let searchableArray = [row6, row5, row4, row3, row2, row1, col4, col3, col5, col2, col6, col1, col7, riseLt1, riseRt6, riseLt2, riseRt5, riseLt3, riseRt4, riseLt4, riseRt3, riseLt5, riseRt2, riseLt6, riseRt1];
    searchableArray.forEach(function(line){
        if (line.search('aaaa') !== -1) winner = 'a';
        if (line.search('bbbb') !== -1) winner = 'b';
    })
    if (board.includes('empty') === false) winner = 't';
    render();
}

/*--------------------------------------5) Init function-----------------------------------------*/

function init(){
    replay.style.visibility = 'hidden';
    for (i=0; i < 42; i++){
        board.pop();
    }
    for (i=0; i < 42; i++){
        board.push('empty');
    }
    let hidden = board.slice(0,35);
    c4Hols.forEach(function(hol, idx) {
        if (hidden[idx] === 'empty') {
            (hol).style.visibility = 'hidden';
        }
    })
    turn = 'a';
    winner = null;
    render();
}
init();