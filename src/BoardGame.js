import React, { useState } from 'react';
import SnakeHead from './SnakeHead';
import SnakeTail from './SnakeTail';
import Food from './Food';

function BoardGame() {
    let [vel, setVel] = useState(5);
    let [newFood, setNewFood] = useState(false);
    let [snakeTail, setSnakeTail] = useState("");
    let [snakeMove, setSnakeMove] = useState([]);
    let [snakeLength, setSnakeLength] = useState(0);

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
        setVel(vel + 0.5);
    }

    const moveSnakeTail = () => {
        let tail = [];
        for (let i = 0; i < snakeLength; i++) {
            tail[i] = {
                top: snakeMove[i].top,
                left: snakeMove[i].left
            }
        }

        tail = tail.map((position, key) => {
            return (
                <SnakeTail key={key} position={position} />
            );
        })
        return tail;
    }

    return (
        <div className="game-board">
            <SnakeHead getOffsetHeight={getOffsetHeight} getOffsetWidth={getOffsetWidth} eatFood={eatFood} vel={vel} snakeMove={snakeMove}
                snakeLength={snakeLength} setSnakeMove={setSnakeMove} moveSnakeTail={moveSnakeTail} setSnakeTail={setSnakeTail} />
            <Food getOffsetHeight={getOffsetHeight} getOffsetWidth={getOffsetWidth} newFood={newFood} />
            {snakeTail}
        </div>
    );

}

export default BoardGame;