
import React from "react";
import {
    Trophy,
    Star,
    ChartNoAxesColumnIncreasing,
    Heart,
    Zap,
} from "lucide-react";

function StatCard({ icon, label, value, className = "" }) {
    return (
        <div className={`stat-card ${className}`}>
            <div className="stat-icon">{icon}</div>

            <div className="stat-content">
                <p>{label}</p>
                <h2>{value}</h2>
            </div>
        </div>
    );
}

export default function GameHUD({
    score = 0,
    highScore = 0,
    level = 1,
    lives = 3,
}) {
    const totalLives = 3;
    const remainingLives = Math.max(
        0,
        Math.min(totalLives, lives)
    );

    const progress = Math.min(
        100,
        ((score % 100) / 100) * 100
    );

    return (
        <aside className="game-hud">

            {/* SCORE */}

            <StatCard
                className="score-card"
                icon={<Trophy />}
                label="Current Score"
                value={score.toLocaleString()}
            />

            {/* HIGH SCORE */}

            <StatCard
                className="highscore-card"
                icon={<Star />}
                label="Best Score"
                value={highScore.toLocaleString()}
            />

            {/* LEVEL */}

            <div className="stat-card level-card">
                <div className="stat-icon">
                    <ChartNoAxesColumnIncreasing />
                </div>

                <div className="stat-content">
                    <p>Current Level</p>
                    <h2>{level}</h2>

                    <div className="level-progress">
                        <div
                            className="level-progress-fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <small>{Math.round(progress)}% to next level</small>
                </div>
            </div>

            {/* LIVES */}

            <div className="stat-card lives-card">
                <div className="stat-icon">
                    <Heart />
                </div>

                <div className="stat-content">
                    <p>Remaining Lives</p>

                    <div className="lives-display">
                        {Array.from(
                            { length: totalLives },
                            (_, index) => {
                                const active = index < remainingLives;

                                return (
                                    <Heart
                                        key={index}
                                        size={23}
                                        className={`life-heart ${active ? "alive" : "lost"
                                            }`}
                                        fill={
                                            active
                                                ? "#ff426d"
                                                : "transparent"
                                        }
                                        color={
                                            active
                                                ? "#ff426d"
                                                : "#777"
                                        }
                                    />
                                );
                            }
                        )}
                    </div>

                    <small>
                        {remainingLives} / {totalLives} lives remaining
                    </small>
                </div>
            </div>

        </aside>
    );
}
