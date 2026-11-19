
import { motion } from "motion/react";
import AppLoader from "../AppLoader";

const puzzlePieces = [
    { x: -100, y: -100, rotate: -90 },
    { x: 100, y: -100, rotate: 90 },
    { x: -100, y: 100, rotate: -90 },
    { x: 100, y: 100, rotate: 90 },
];

export default function PuzzleIntro() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            <AppLoader />

            <div className="pointer-events-none absolute inset-0 z-50 grid grid-cols-2 grid-rows-2">
                {puzzlePieces.map((piece, index) => (
                    <motion.div
                        key={index}
                        initial={{
                            x: piece.x,
                            y: piece.y,
                            rotate: piece.rotate,
                            opacity: 1,
                            scale: 1,
                        }}
                        animate={{
                            x: 0,
                            y: 0,
                            rotate: 0,
                            opacity: 0,
                            scale: 0.8,
                        }}
                        transition={{
                            duration: 0.9,
                            delay: 1.7 + index * 0.12,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="border border-violet-400/20 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 backdrop-blur-sm"
                    />
                ))}
            </div>
        </div>
    );
}
