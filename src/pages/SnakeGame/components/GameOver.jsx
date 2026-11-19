
import React from "react";
import { Trophy, RotateCcw, Home } from "lucide-react";

export default function GameOver({
    score,
    highScore,
    onReplay,
    onHome,
}) {
    return (
        <div className="gameover-overlay">
            <div className="gameover-card">
                <h2>Game Over</h2>

                <Trophy size={48} className="gameover-trophy" />

                <p>Your Score</p>
                <h1>{score}</h1>

                <p className="best-score">
                    High Score: {highScore.toLocaleString()}
                </p>

                {score > 0 && score === highScore && (
                    <span className="new-record">NEW RECORD!</span>
                )}

                <div className="gameover-actions">
                    <button className="menu-button primary" onClick={onReplay}>
                        <RotateCcw /> Play Again
                    </button>

                    <button className="menu-button" onClick={onHome}>
                        <Home /> Home
                    </button>
                </div>
            </div>
        </div>
    );
}
