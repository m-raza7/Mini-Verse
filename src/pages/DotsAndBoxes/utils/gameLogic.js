
export const createInitialGame = (size = 4) => ({
    size,
    currentPlayer: "blue",
    edges: {},
    boxes: {},
    scores: {
        blue: 0,
        red: 0,
    },
    totalBoxes: size * size,
    gameOver: false,
});

// Generate edge ID
export const getEdgeId = (type, row, col) => {
    return `${type}-${row}-${col}`;
};

// Get four edges surrounding a box
export const getBoxEdges = (row, col) => [
    getEdgeId("h", row, col),
    getEdgeId("h", row + 1, col),
    getEdgeId("v", row, col),
    getEdgeId("v", row, col + 1),
];

// Check whether a box is completed
export const isBoxComplete = (edges, row, col) => {
    const boxEdges = getBoxEdges(row, col);

    return boxEdges.every((edge) => edges[edge]);
};

// Get boxes adjacent to an edge
export const getAdjacentBoxes = (type, row, col, size) => {
    if (type === "h") {
        return [
            ...(row > 0 ? [{ row: row - 1, col }] : []),
            ...(row < size ? [{ row, col }] : []),
        ];
    }

    return [
        ...(col > 0 ? [{ row, col: col - 1 }] : []),
        ...(col < size ? [{ row, col }] : []),
    ];
};

// Check winner
export const getWinner = (scores) => {
    if (scores.blue > scores.red) return "blue";
    if (scores.red > scores.blue) return "red";

    return "draw";
};
