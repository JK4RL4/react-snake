import React, { useState, useRef } from 'react';
import SnakeHead from './SnakeHead';
import SnakeTail from './SnakeTail';
import Food from './Food';

function BoardGame(props) {
    let [newFood, setNewFood] = useState(false);
    let [snakeTail, setSnakeTail] = useState("");
    let [snakeLength, setSnakeLength] = useState(0);
    let snakeMove = useRef([]);
    let [gameFinished, setGameFinished] = useState(false);

    const getOffsetWidth = () => {
        let gameBoard = document.querySelector(".game-board");
        return gameBoard.offsetWidth;
    }

    const getOffsetHeight = () => {
        let gameBoard = document.querySelector(".game-board");
        return gameBoard.offsetHeight;
    }

    const eatFood = () => {
        setSnakeLength(++snakeLength);
        setNewFood(!newFood);
        props.setVel(props.vel + 0.5);
    }

    const moveSnakeTail = () => {
        let tail = [];
        for (let i = 0; i < snakeLength; i++) {
            tail[i] = {
                top: snakeMove.current[i].top,
                left: snakeMove.current[i].left
            }
        }

        tail = tail.map((position, key) => {
            return (
                <SnakeTail key={key} position={position} />
            );
        })

        cleanSnakeMove();

        return tail;
    }

    const cleanSnakeMove = () => {
        let arrayAux = snakeMove.current.slice(0, snakeLength);
        snakeMove.current = arrayAux;
    }

    const finishGame = () => {
        setGameFinished(true);
    }

    return (
        <div className="game-board">
        {props.start &&
            <>
            <SnakeHead getOffsetHeight={getOffsetHeight} getOffsetWidth={getOffsetWidth} eatFood={eatFood} vel={props.vel} snakeMove={snakeMove} snakeLength={snakeLength}
                       moveSnakeTail={moveSnakeTail} setSnakeTail={setSnakeTail} finishGame={finishGame} gameFinished={gameFinished}/>
            <Food getOffsetHeight={getOffsetHeight} getOffsetWidth={getOffsetWidth} newFood={newFood} />
            {snakeTail}
            </>
        }
        {gameFinished &&
            <div className="finish-game"> 
                <p>La partida ha terminado</p>
                <p>Longitud de la serpiente: <span>{snakeLength}</span></p>
                <button onClick={() => window.location.reload()}>Volver</button>
            </div>
        }
        </div>
    );

}

export default BoardGame;