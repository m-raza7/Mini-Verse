
import { useRef, useCallback } from "react";

const SWIPE_THRESHOLD = 22;

const useSwipeControls = ({
    onDirectionChange,
    disabled = false,
}) => {
    const startPosition = useRef(null);

    const handlePointerDown = useCallback((event) => {
        if (disabled) return;

        // Ignore right and middle mouse clicks
        if (event.pointerType === "mouse" && event.button !== 0) {
            return;
        }

        event.preventDefault();

        startPosition.current = {
            x: event.clientX,
            y: event.clientY,
            pointerId: event.pointerId,
        };

        // Keep receiving pointer events if the pointer leaves the board
        event.currentTarget.setPointerCapture(event.pointerId);
    }, [disabled]);

    const handlePointerUp = useCallback((event) => {
        if (disabled || !startPosition.current) return;

        const start = startPosition.current;

        if (start.pointerId !== event.pointerId) return;

        const deltaX = event.clientX - start.x;
        const deltaY = event.clientY - start.y;

        startPosition.current = null;

        // Ignore small movements
        if (
            Math.abs(deltaX) < SWIPE_THRESHOLD &&
            Math.abs(deltaY) < SWIPE_THRESHOLD
        ) {
            return;
        }

        // Detect the dominant direction
        let direction;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            direction = deltaX > 0 ? "RIGHT" : "LEFT";
        } else {
            direction = deltaY > 0 ? "DOWN" : "UP";
        }

        onDirectionChange?.(direction);
    }, [disabled, onDirectionChange]);

    const handlePointerCancel = useCallback(() => {
        startPosition.current = null;
    }, []);

    return {
        onPointerDown: handlePointerDown,
        onPointerUp: handlePointerUp,
        onPointerCancel: handlePointerCancel,
    };
};

export default useSwipeControls;
