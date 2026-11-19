
import rainforest from "../../../assets/background/rainforest.png";
import rainyForest from "../../../assets/background/rainy-forest.png";
import desert from "../../../assets/background/desert.png";
import snow from "../../../assets/background/snow.png";
import volcano from "../../../assets/background/volcano.png";
import underwater from "../../../assets/background/underwater.png";

export const environments = [
    {
        id: "forest",
        name: "Jungle Forest",
        icon: "🌳",
        description: "Explore the green jungle",
        weather: "Sunny",
        background: "#071b13",
        backgroundImage: rainforest,
        grid: "rgba(74, 222, 128, 0.12)",
        snake: "#39ef65",
        food: "#ff365f",
        unlocked: true,
    },
    {
        id: "rain",
        name: "Rainy Forest",
        icon: "🌧️",
        description: "Survive the heavy rain",
        weather: "Rainy",
        background: "#101a2b",
        backgroundImage: rainyForest,
        grid: "rgba(96, 165, 250, 0.15)",
        snake: "#45e6a0",
        food: "#ff526e",
        unlocked: true,
    },
    {
        id: "desert",
        name: "Desert",
        icon: "🏜️",
        description: "Discover the golden desert",
        weather: "Dusty",
        background: "#382314",
        backgroundImage: desert,
        grid: "rgba(251, 191, 36, 0.15)",
        snake: "#a3c957",
        food: "#f97316",
        unlocked: true,
    },
    {
        id: "snow",
        name: "Snow World",
        icon: "❄️",
        description: "Explore the frozen kingdom",
        weather: "Snowy",
        background: "#102438",
        backgroundImage: snow,
        grid: "rgba(186, 230, 253, 0.18)",
        snake: "#67e8f9",
        food: "#ff5478",
        unlocked: true,
    },
    {
        id: "volcano",
        name: "Volcano",
        icon: "🌋",
        description: "Escape the burning lava",
        weather: "Hot",
        background: "#260d0b",
        backgroundImage: volcano,
        grid: "rgba(248, 113, 113, 0.15)",
        snake: "#fb923c",
        food: "#facc15",
        unlocked: true,
    },
    {
        id: "underwater",
        name: "Underwater",
        icon: "🌊",
        description: "Dive into the deep ocean",
        weather: "Underwater",
        background: "#06243a",
        backgroundImage: underwater,
        grid: "rgba(103, 232, 249, 0.15)",
        snake: "#22d3ee",
        food: "#f472b6",
        unlocked: true,
    },
];

export const getEnvironment = (id) =>
    environments.find((environment) => environment.id === id) ||
    environments[0];
