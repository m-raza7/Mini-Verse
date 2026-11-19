
export const GRID_SIZE = 28;
export const BOARD_COLS = 28;
export const BOARD_ROWS = 16;

export const INITIAL_SNAKE = [
    { x: 8, y: 8 },
    { x: 7, y: 8 },
    { x: 6, y: 8 },
    { x: 5, y: 8 },
];

export const DIRECTIONS = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 },
};

export function createFood(snake) {
    let food;

    do {
        food = {
            x: Math.floor(Math.random() * BOARD_COLS),
            y: Math.floor(Math.random() * BOARD_ROWS),
        };
    } while (
        snake.some(
            (segment) =>
                segment.x === food.x &&
                segment.y === food.y
        )
    );

    return food;
}

export function moveSnake(snake, direction, food) {
    const head = snake[0];

    const newHead = {
        x: head.x + direction.x,
        y: head.y + direction.y,
    };

    const ateFood =
        newHead.x === food.x &&
        newHead.y === food.y;

    const body = ateFood ? snake : snake.slice(0, -1);

    const wallCollision =
        newHead.x < 0 ||
        newHead.y < 0 ||
        newHead.x >= BOARD_COLS ||
        newHead.y >= BOARD_ROWS;

    const selfCollision = body.some(
        (segment) =>
            segment.x === newHead.x &&
            segment.y === newHead.y
    );

    return {
        snake: [newHead, ...body],
        ateFood,
        gameOver: wallCollision || selfCollision,
    };
}
