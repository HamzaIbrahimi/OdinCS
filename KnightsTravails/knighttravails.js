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

function containsPosition(position, array) {
    for (const pos of array) {
        if (pos[0] === position[0] && pos[1] === position[1]) {
            return true;
        }
    }
    return false;
}

function constructPath(o, s, d, a) {
    if (o[d] === null) {
        a.push(s);
        let path = a.reverse();
        let msg = `You made it in ${a.length - 1} moves! Here's your path: \n`;
        for (const move of path) {
            msg += `[${move}]\n`;
        }
        return msg.trim();
    }
    let pos = o[d];
    a.push(d);
    return constructPath(o, s, pos, a);
}

function validMove(move) {
    if (move[0] < 0 || move[0] > 7 || move[1] < 0 || move[1] > 7) {
        return false;
    }
    return true;
}

function KnightMoves(s, d) {
    if (!validMove(s) || !validMove(d)) {
        throw new Error('Illegal source or destination');
    }
    const visited = [];
    const q = new Queue();
    q.enqueue(s);
    visited.push(s);
    let o = {};
    o[s] = null;
    while (!q.isEmpty()) {
        let currPosition = q.dequeue();
        for (let position of possiblePositions(currPosition)) {
            if (!containsPosition(position, visited)) {
                q.enqueue(position);
                visited.push(position);
                o[position] = currPosition;
            }
        }
        if (o[d]) {
            break;
        }
    }
    return constructPath(o, s, d, []);
}

let o = KnightMoves([0, 0], [7, 7]);
console.log(o);
