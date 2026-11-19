
import React, { useEffect, useRef } from "react";
import { environments } from "../config/environments";

const CELL = 28;

export default function SnakeCanvas({
    snake,
    food,
    theme = "forest",
}) {
    const canvasRef = useRef(null);

    const currentTheme =
        environments.find((item) => item.id === theme) ||
        environments[0];

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas || !snake?.length || !food) return;

        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        // =====================================
        // BACKGROUND GRID
        // =====================================

        ctx.strokeStyle = currentTheme.grid;
        ctx.lineWidth = 1;

        for (let x = 0; x <= width; x += CELL) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        for (let y = 0; y <= height; y += CELL) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // =====================================
        // FOOD
        // =====================================

        const fx = food.x * CELL + CELL / 2;
        const fy = food.y * CELL + CELL / 2;

        ctx.save();

        ctx.shadowColor = currentTheme.food;
        ctx.shadowBlur = 22;

        const foodGradient = ctx.createRadialGradient(
            fx - 4,
            fy - 5,
            1,
            fx,
            fy,
            13
        );

        foodGradient.addColorStop(0, "#ffffff");
        foodGradient.addColorStop(0.35, currentTheme.food);
        foodGradient.addColorStop(1, "#7f1732");

        ctx.fillStyle = foodGradient;

        ctx.beginPath();
        ctx.arc(fx, fy, 11, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Food leaf
        ctx.save();

        ctx.fillStyle = "#8eea46";

        ctx.beginPath();
        ctx.ellipse(
            fx + 4,
            fy - 13,
            5,
            3,
            -0.5,
            0,
            Math.PI * 2
        );

        ctx.fill();
        ctx.restore();

        // =====================================
        // SNAKE BODY
        // =====================================

        snake.slice(1).forEach((segment, index) => {
            const x = segment.x * CELL + CELL / 2;
            const y = segment.y * CELL + CELL / 2;

            const radius = 12.5;

            ctx.save();

            ctx.shadowColor = currentTheme.snake;
            ctx.shadowBlur = 9;

            const gradient = ctx.createLinearGradient(
                x - radius,
                y - radius,
                x + radius,
                y + radius
            );

            gradient.addColorStop(0, "#e0ffbd");
            gradient.addColorStop(0.3, currentTheme.snake);
            gradient.addColorStop(0.75, currentTheme.snake);
            gradient.addColorStop(1, "#08732a");

            ctx.fillStyle = gradient;

            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();

            // Scale pattern
            ctx.shadowBlur = 0;

            ctx.strokeStyle = "rgba(4, 70, 34, 0.55)";
            ctx.lineWidth = 1;

            for (let i = -1; i <= 1; i++) {
                ctx.beginPath();

                ctx.arc(
                    x + i * 6,
                    y - 3,
                    4,
                    0.2,
                    Math.PI - 0.2
                );

                ctx.stroke();
            }

            // Body highlight
            ctx.fillStyle = "rgba(255,255,255,0.22)";

            ctx.beginPath();
            ctx.arc(x - 4, y - 5, 2.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        });

        // =====================================
        // SNAKE HEAD
        // =====================================

        const head = snake[0];

        const hx = head.x * CELL + CELL / 2;
        const hy = head.y * CELL + CELL / 2;

        ctx.save();

        ctx.shadowColor = currentTheme.snake;
        ctx.shadowBlur = 17;

        const headGradient = ctx.createLinearGradient(
            hx - 12,
            hy - 12,
            hx + 12,
            hy + 12
        );

        headGradient.addColorStop(0, "#e0ffbd");
        headGradient.addColorStop(0.4, currentTheme.snake);
        headGradient.addColorStop(1, "#08732a");

        ctx.fillStyle = headGradient;

        ctx.beginPath();
        ctx.ellipse(
            hx,
            hy,
            14,
            12,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.shadowBlur = 0;

        // Eye white
        ctx.fillStyle = "#ffffff";

        ctx.beginPath();
        ctx.arc(hx + 5, hy - 5, 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Eye pupil
        ctx.fillStyle = "#111111";

        ctx.beginPath();
        ctx.arc(hx + 6, hy - 5, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Eye highlight
        ctx.fillStyle = "#ffffff";

        ctx.beginPath();
        ctx.arc(hx + 7, hy - 6, 1, 0, Math.PI * 2);
        ctx.fill();

        // Nostril
        ctx.fillStyle = "#145c2a";

        ctx.beginPath();
        ctx.arc(hx + 11, hy + 1, 1.1, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

    }, [snake, food, currentTheme]);

    return (
        <canvas
            ref={canvasRef}
            className="snake-canvas"
            width={784}
            height={448}
        />
    );
}
