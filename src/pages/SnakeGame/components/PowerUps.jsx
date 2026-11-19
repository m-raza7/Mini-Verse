
import React from "react";
import { Zap, Shield, Magnet } from "lucide-react";

const powers = [
    {
        name: "Shield",
        icon: <Shield />,
        color: "blue",
        count: 3,
    },
    {
        name: "Speed Boost",
        icon: <Zap />,
        color: "purple",
        count: 2,
    },
    {
        name: "Magnet",
        icon: <Magnet />,
        color: "pink",
        count: 2,
    },
];

export default function PowerUps() {
    return (
        <aside className="power-panel">
            <h2><Zap /> Power-Ups</h2>

            {powers.map((power) => (
                <div className="power-card" key={power.name}>
                    <div className={`power-icon ${power.color}`}>
                        {power.icon}
                    </div>

                    <span>{power.name}</span>
                    <strong>{power.count}</strong>
                </div>
            ))}
        </aside>
    );
}
