import Queue from './Queue.js';

function possiblePositions(position) {
    let moves = [];
    let [x, y] = [position[0], position[1]];
    for (let move of exactMoves()) {
        let curr = [x + move[0], y + move[1]];
        if (curr[0] < 0 || curr[0] > 7 || curr[1] < 0 || curr[1] > 7) {
            continue;
        } else {
            moves.push(curr);
        }
    }
    return moves;
}

console.log(possiblePositions([0, 0]));

function exactMoves() {
    let [x, y] = [1, 2];
    let a = [];
    for (let i = 0; i < 2; i++) {
        if (i === 1) {
            [x, y] = [2, 1];
        }
        for (let j = 0; j < 4; j++) {
            if (j < 2) {
                a.push([x, y]);
                x *= -1;
                y *= -1;
            } else {
                y *= -1;
                a.push([x, y]);
                x *= -1;
            }
        }
    }
    return a;
}
