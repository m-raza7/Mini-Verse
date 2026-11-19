
import React from "react";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { DIRECTIONS } from "../engine/gameEngine";

export default function MobileControls({ onDirection }) {
    return (
        <div className="mobile-controls">
            <button
                onClick={() => onDirection(DIRECTIONS.UP)}
                aria-label="Up"
            >
                <ChevronUp />
            </button>

            <div>
                <button
                    onClick={() => onDirection(DIRECTIONS.LEFT)}
                    aria-label="Left"
                >
                    <ChevronLeft />
                </button>

                <button
                    onClick={() => onDirection(DIRECTIONS.DOWN)}
                    aria-label="Down"
                >
                    <ChevronDown />
                </button>

                <button
                    onClick={() => onDirection(DIRECTIONS.RIGHT)}
                    aria-label="Right"
                >
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
}
