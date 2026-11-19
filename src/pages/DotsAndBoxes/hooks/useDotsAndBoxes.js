
import { useState, useEffect } from "react";

import {
    createInitialGame,
    getAdjacentBoxes,
    isBoxComplete,
} from "../utils/gameLogic";

const STORAGE_KEY = "miniverse-dots-and-boxes";

export default function useDotsAndBoxes(initialSize = 4) {

    // Load saved game from localStorage
    const [game, setGame] = useState(() => {
        try {
            const savedGame = localStorage.getItem(STORAGE_KEY);

            if (savedGame) {
                const parsedGame = JSON.parse(savedGame);

                // Validate saved game
                if (
                    parsedGame.size >= 3 &&
                    parsedGame.size <= 6 &&
                    parsedGame.edges &&
                    parsedGame.boxes &&
                    parsedGame.scores &&
                    ["blue", "red"].includes(parsedGame.currentPlayer)
                ) {
                    return parsedGame;
                }
            }
        } catch (error) {
            console.error("Failed to restore game:", error);
        }

        return createInitialGame(initialSize);
    });

    // Automatically save game whenever state changes
    useEffect(() => {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(game)
            );
        } catch (error) {
            console.error("Failed to save game:", error);
        }
    }, [game]);

    // Connect two dots
    const connectDots = (type, row, col) => {
        setGame((previous) => {

            if (previous.gameOver) return previous;

            const edgeId = `${type}-${row}-${col}`;

            // Prevent duplicate lines
            if (previous.edges[edgeId]) return previous;

            const edges = {
                ...previous.edges,
                [edgeId]: previous.currentPlayer,
            };

            const boxes = { ...previous.boxes };
            const scores = { ...previous.scores };

            let captured = 0;

            // Find adjacent boxes
            const adjacentBoxes = getAdjacentBoxes(
                type,
                row,
                col,
                previous.size
            );

            adjacentBoxes.forEach(({ row: r, col: c }) => {
                const boxId = `${r}-${c}`;

                if (
                    !boxes[boxId] &&
                    isBoxComplete(edges, r, c)
                ) {
                    boxes[boxId] = previous.currentPlayer;

                    scores[previous.currentPlayer] += 1;

                    captured++;
                }
            });

            // Check game completion
            const completed =
                Object.keys(boxes).length === previous.totalBoxes;

            return {
                ...previous,
                edges,
                boxes,
                scores,
                gameOver: completed,

                // Extra turn when capturing a box
                currentPlayer: captured
                    ? previous.currentPlayer
                    : previous.currentPlayer === "blue"
                        ? "red"
                        : "blue",
            };
        });
    };

    // Restart game
    const resetGame = (size = game.size) => {
        setGame(createInitialGame(size));
    };

    return {
        game,
        connectDots,
        resetGame,
    };
}
