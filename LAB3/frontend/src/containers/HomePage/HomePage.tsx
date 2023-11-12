import "./HomePage.css";
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Player, startGame } from "./game";
import { format, set } from "date-fns";

export const HomePage = () => {
    const [visibleNewGame, setVisibleNewGame] = useState(true);
    const [collision, setCollision] = useState(false);
    const [player, setPlayer] = useState(new Player(10, 10, "red"));
    const savedBestRes = localStorage.getItem("bestResult") ?? "0";
    const [bestResult, setBestResult] = useState(parseInt(savedBestRes, 10));
    //this is for stopwatch
    const [time, setTime] = useState(new Date(0));
    const [startTime, setStartTime] = useState<number | null>(null);
    const [running, setRunning] = useState(false);

    const startStopwatch = () => {
        const newStartTime = new Date().getTime();
        setStartTime(newStartTime);
        setRunning(true);
    };

    const endStopwatch = () => {
        if (running) {
            setRunning(false);
        }
    };

    const resetStopwatch = () => {
        setTime(new Date(0));
        setStartTime(null);
    };

    const formattedTime = (millisec: any) => {
        const t = new Date(millisec);
        const minutes = format(t, "mm");
        const seconds = format(t, "ss");
        const milliseconds = format(t, "SS");
        return `${minutes}:${seconds}:${milliseconds}`;
    };

    useEffect(() => {
        if (running) {
            const interval = setInterval(() => {
                setTime(new Date(new Date().getTime() - (startTime || 0)));
            }, 10);

            return () => clearInterval(interval);
        }
    }, [running, startTime, time]);

    const handleStartGame = () => {
        setVisibleNewGame(false);
        resetStopwatch();
        startStopwatch();
        startGame(player, setCollision);
    };

    useEffect(() => {
        if (collision) {
            setVisibleNewGame(true);
            setCollision(false);
            endStopwatch();

            //azuriranje najboljeg rezultata
            if (time.getTime() > bestResult) {
                setBestResult(time.getTime());
                localStorage.setItem("bestResult", time.getTime().toString());
            }
        }
    }, [collision]);

    useEffect(() => {
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
            <h1>
                Best result: {formattedTime(bestResult)} Current result:
                {formattedTime(time.getTime())}
            </h1>
            <div id="home-page-container-canvas" />
            <audio id="collisionSound" src="sound.mp3"></audio>
            <Dialog
                visible={visibleNewGame}
                onHide={() => setVisibleNewGame(false)}
                className="dialog-start-new-game"
                header={"Start new game"}
            >
                <div>
                    <p>Current result: {formattedTime(time.getTime())}</p>
                    <p>Best result: {formattedTime(bestResult)}</p>
                    <Button label="New game" onClick={handleStartGame}></Button>
                </div>
            </Dialog>
        </div>
    );
};
