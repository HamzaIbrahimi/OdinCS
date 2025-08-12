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

function knightMoves(s, d) {
    const visited = [];
    const q = new Queue();
    q.enqueue(s);
    visited.push(s);
    while (!q.isEmpty()) {
        let currPosition = q.dequeue();
        for (let position of possiblePositions(currPosition)) {
            if (!containsPosition(position, visited)) {
                q.enqueue(position);
                visited.push(position);
                if (containsPosition(d, visited)) {
                    return visited;
                }
            }
        }
    }
    return visited;
}

console.log(knightMoves([0, 0], [3, 3]));
