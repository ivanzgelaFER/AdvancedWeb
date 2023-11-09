import "./HomePage.css";
import { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Player, startGame } from "./game";

export const HomePage = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [visible, setVisible] = useState(true);
    const [gameStarted, setGameStarted] = useState(false);

    var player = new Player(10, 10, "red");

    const handleStartGame = () => {
        setGameStarted(true);
        setVisible(false);
    };

    useEffect(() => {
        startGame(player);

        document.addEventListener("keyup", e => {
            if (player) {
                if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                    player.speed_y = 0;
                }
                if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                    player.speed_x = 0;
                }
            }
        });

        document.addEventListener("keydown", e => {
            if (player) {
                switch (e.key) {
                    case "ArrowUp":
                        player.speed_y -= 1;
                        break;
                    case "ArrowDown":
                        player.speed_y += 1;
                        break;
                    case "ArrowLeft":
                        player.speed_x -= 1;
                        break;
                    case "ArrowRight":
                        player.speed_x += 1;
                        break;
                    default:
                        break;
                }
            }
        });
    }, []);

    return (
        <div className="home-page-container">
            <div id="home-page-container-canvas" />
            {/*
            <Dialog visible={visible} onHide={() => setVisible(false)} header={"Start new game"}>
                <div>
                    <p>Currently best result: {localStorage.getItem("best-result")}</p>
                    <Button label="New game" onClick={handleStartGame}></Button>
                </div>
            </Dialog>
            
            */}
        </div>
    );
};
