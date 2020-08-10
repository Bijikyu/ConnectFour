
/*========================================================================================MODEL==*/

/*-----------------------------------------1) Constants------------------------------------------*/

const DISPLAY = {
    empty: "url('https://imgur.com/vsLSXq0.png')",
    playerOne: "url('https://imgur.com/qSMQ9XE.png')",
    playerTwo: "url('https://imgur.com/QJRtftD.png')"
}

/*--------------------------------2) Application State (Variables)-------------------------------*/

let board = [];
let turn;
let winner;

/*=========================================================================================VIEW==*/

/*---------------------------------3) Cached Element Referances----------------------------------*/

const topMsg = document.getElementById('topMsg');
const theDiv = document.getElementById('theDiv');
//const brdGme = document.getElementById('brdGme');
const replay = document.getElementById('replay');
const c4Hols = document.querySelectorAll('.c4Hol');

/*-------------------------------------4) Event Listeners----------------------------------------*/

theDiv.addEventListener('click', holClk);
//brdGme.addEventListener('click', holClk);
replay.addEventListener('click', init);

/*-------------------------------------6) Render Functions---------------------------------------*/

let champ;

function render(){
    if (winner !== null) replay.style.visibility = 'visible';
    if (winner === 't') topMsg.innerText = 'It is a tie!';
    if (winner === 'a' || winner === 'b'){
        winner === 'a' ? champ = 'Player 1' : champ = 'Player 2';
        topMsg.innerText = `${champ} is the champ!`;
    }
    else if (winner !== 't') {
        turn === 'a' ? topMsg.innerText = 'It is the turn for Player 1' : topMsg.innerText = 'It is the turn for Player 2';
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
    })
}

/*===================================================================================CONTROLLER==*/

/*------------------------------------------Functions--------------------------------------------*/

function holClk(evt){
    console.log(evt.target);
    let holIdx = evt.target.id.replace('hol','');
    console.log('1 ' + board[holIdx]);
    if (board[holIdx] !== 'empty') return;
    console.log('2 ' + board[holIdx]);
    console.log('winner is ' + winner);
    if (winner !== null) return;
    console.log('winner is ' + winner);
    //TODO if any hole is clicked that is physically higher (lower index)
    // than a hole in the same column that is empty, return.
    turn === 'a' ? board[holIdx] = 'a' : board[holIdx] = 'b';
    console.log(board);
    console.log('turn is ' + turn)
    console.log('3 ' + board[holIdx])
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
// Start, reset, replay. Initiate the init function to initialize all state variables.

function init(){
    replay.style.visibility = 'hidden';
    for (i=0; i < 42; i++){
        board.pop();
    }
    for (i=0; i < 42; i++){
        board.push('empty');
    }
    turn = 'a';
    winner = null;
    render();
}
init();

/* 

Extensions: 
1) Highlight winning row
2) affiliate link
3) hx and facts of the game
4) animations for disc dropping
5) drag and drop discs
6) computer driven player 2
7) multiplayer at a distance

*/