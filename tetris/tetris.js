
// Initialize canvas
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const $score = document.querySelector('span');
const $section = document.querySelector('section');


const BLOCK_SIZE = 20;
const BOARD_WIDTH = 14;
const BOARD_HEIGHT = 30;

let score = 0;

canvas.width = BLOCK_SIZE * BOARD_WIDTH;
canvas.height = BLOCK_SIZE * BOARD_HEIGHT;

context.scale(BLOCK_SIZE, BLOCK_SIZE);

// Making the principal board
const board = createBoard(BOARD_WIDTH, BOARD_HEIGHT)

function createBoard (width, height) {
    return Array(height).fill().map(() => Array(width).fill(0))
}
// Making piece
const piece = {
    position: {x: 5, y:5},
    shape: [
        [1, 1],
        [1, 1]
    ]
}

// Ramdom pieces
const PIECES = [
    [
        [1, 1],
        [1, 1]
    ],
    [
        [1, 1, 1, 1]
    ],
    [
        [0, 1, 0],
        [1, 1, 1]
    ],
    [
        [1, 0, 0],
        [1, 1, 1]
    ],
    [
        [1, 1, 0],
        [0, 1, 1]
    ]
]

// Run the game loop
// function update () {
//     draw();
//     window.requestAnimationFrame(update);

// }

let counterDrop = 0;
let lastTime = 0;

function update (time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    counterDrop += deltaTime;

    if (counterDrop > 1000) {
        piece.position.y++;
        counterDrop = 0;

        if(CheckCollision()) {
            piece.position.y--;
            solidPiece();
            removeRows();

        }

    }

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
    $score.innerText = score;

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

    if (event.key === 'ArrowUp') {
        const rotatePiece = []

        for (let i=0; i < piece.shape[0].length; i++) {
            const row = [];
            for (let j = piece.shape.length - 1; j >= 0; j--) {
                row.push(piece.shape[j][i])
            }

            rotatePiece.push(row);
        }
        const previousShape = piece.shape;
        piece.shape = rotatePiece;
        if (CheckCollision()) {
            piece.shape = previousShape;

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

    // Reset piece position
    piece.position.x = 0;
    piece.position.y = 0;

    // get the ramdon pieces
    piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)]

    //game over
    if (CheckCollision()) {
        window.alert('Sorry! Game Over!!!');
        board.forEach((row) => row.fill(0));

    }
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
        score += 10;


    })
}

$section.addEventListener('click', () => {
    update()

    $section.remove()
    const audio = new window.Audio('tetris.mp3');
    audio.volume = 0.5;
    audio.play();


})


