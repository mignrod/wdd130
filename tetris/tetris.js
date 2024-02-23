
// Initialize canvas
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const BLOCK_SIZE = 20;
const BOARD_WIDTH = 14;
const BOARD_HEIGHT = 30;

canvas.width = BLOCK_SIZE * BOARD_WIDTH;
canvas.height = BLOCK_SIZE * BOARD_HEIGHT;

context.scale(BLOCK_SIZE, BLOCK_SIZE);

// Making the principal board
const board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1]
    
]

// Making piece
const piece = {
    position: {x: 5, y:5},
    shape: [
        [1, 1],
        [1, 1]
    ]
}

// Run the game loop
function update () {
    draw();
    window.requestAnimationFrame(update);

}

function draw () {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    board.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value === 1) {
                context.fillStyle = 'blue';
                context.fillRect(x, y, 1, 1);     
            }
        })
    })

    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                context.fillStyle = 'red';
                context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1);

            }
        })
    })

}

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
        piece.position.x--;
        if (CheckCollision()) {
            piece.position.x++
        }
    }

    if (event.key === 'ArrowRight') {
        piece.position.x++;
        if (CheckCollision()) {
            piece.position.x--
        }
    }

    if (event.key === 'ArrowDown') {
        piece.position.y++
        if (CheckCollision()) {
            piece.position.y--
            solidPiece();
            removeRows();
            
        }
    }

})

function CheckCollision () {
    return piece.shape.find((row, y) => {
        return row.find((value, x) => {
            return (
                value !== 0 &&
                board[y + piece.position.y]?.[x + piece.position.x] !== 0
            )
        })
    })
}

function solidPiece () {
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value === 1) {
                board[y + piece.position.y][x + piece.position.x] = value;

            }
        })
    })

    piece.position.x = 0;
    piece.position.y = 0;

}

function removeRows () {
    const rowsRemoved = [];
    board.forEach((row, y) => {
        if (row.every(value => value === 1)) {
            rowsRemoved.push(y)
        }
    })

    rowsRemoved.forEach (y => {
        board.splice(y, 1)
        const newRow = Array(BOARD_WIDTH).fill(0)
        board.unshift(newRow);

    })
}

update()
