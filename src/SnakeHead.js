import React, { useEffect, useState, useRef } from 'react';

function SnakeHead(props) {
    let [snakeHeadTop, setSnakeHeadTop] = useState(0);
    let [snakeHeadLeft, setSnakeHeadLeft] = useState(0);
    let snakeNewMove = props.snakeMove.current.slice();
    let [dir, setDir] = useState("right");
    let refDir = useRef("right");
    let moveFlag = useRef(true);
    let styler = {
        top: snakeHeadTop,
        left: snakeHeadLeft
    }

    function useEventListener(eventName, handler, element = window) {
        let savedHandler = useRef();

        useEffect(() => {
            savedHandler.current = handler;
        }, [handler]);

        useEffect(() => {
            let isSupported = element && element.addEventListener;
            if (!isSupported) return;

            let eventListener = event => savedHandler.current(event);

            element.addEventListener(eventName, eventListener);

            return () => {
                document.removeEventListener(eventName, eventListener);
            };
        }, [eventName, element]);
    };

    const updateDir = (e) => {
        let newDir;

        if (moveFlag.current) {
            moveFlag.current = false;
            switch (e.key) {
                case "ArrowUp":
                    newDir = setNewDir("up");
                    break;
                case "w":
                    newDir = setNewDir("up");
                    break;
                case "ArrowDown":
                    newDir = setNewDir("down");
                    break;
                case "s":
                    newDir = setNewDir("down");
                    break;
                case "ArrowRight":
                    newDir = setNewDir("right");
                    break;
                case "d":
                    newDir = setNewDir("right");
                    break;
                case "ArrowLeft":
                    newDir = setNewDir("left");
                    break;
                case "a":
                    newDir = setNewDir("left");
                    break;
                default:
                    newDir = refDir.current;
                    break;
            }

            if (newDir !== refDir.current) {
                setDir(newDir);
                refDir.current = newDir;
            }
        }
    }

    const setNewDir = (newDir) => {
        if ((refDir.current === "up" && newDir === "down") ||
            (refDir.current === "down" && newDir === "up") ||
            (refDir.current === "right" && newDir === "left") ||
            (refDir.current === "left" && newDir === "right") ||
            (refDir.current === "w" && newDir === "s") ||
            (refDir.current === "s" && newDir === "w") ||
            (refDir.current === "d" && newDir === "a") ||
            (refDir.current === "a" && newDir === "d")) {
            return refDir.current;
        } else {
            return newDir;
        }
    }

    const move = (id, dir) => {
        let snakeHead = document.querySelector(id);
        let snake = {
            top: snakeHead.offsetTop,
            left: snakeHead.offsetLeft,
            width: snakeHead.offsetWidth,
            height: snakeHead.offsetHeight,
            bottom: snakeHead.offsetTop + snakeHead.offsetHeight,
            right: snakeHead.offsetLeft + snakeHead.offsetWidth
        }

        snakeNewMove.unshift({ top: snake.top, left: snake.left });
        props.snakeMove.current = snakeNewMove;

        switch (dir) {
            case "up":
                setSnakeHeadTop(snake.top - snake.width);
                break;
            case "down":
                setSnakeHeadTop(snake.top + snake.width);
                break;
            case "left":
                setSnakeHeadLeft(snake.left - snake.width);
                break;
            case "right":
                setSnakeHeadLeft(snake.left + snake.width);
                break;
            default:
                break;
        }

        checkWallCollision(snake);
        checkFoodCollision(snake);
        checkSnakeCollision(snake);
    }

    const checkWallCollision = (snake) => {
        if (snake.left < 0 ||
            snake.top < 0 ||
            snake.top + snake.width > props.getOffsetHeight() - 10 ||
            snake.left + snake.height > props.getOffsetWidth() - 10) {
                props.finishGame();
        }
    }

    const checkFoodCollision = (snake) => {
        let food = document.querySelector(".food");
        food = {
            top: food.offsetTop,
            left: food.offsetLeft,
        }
        if (snake.top === food.top && snake.left === food.left) {
            props.eatFood();
        }
    }

    const checkSnakeCollision = () => {
        let snakeHead = document.querySelector("#snake-head");
        let snake = {
            top: snakeHead.offsetTop,
            left: snakeHead.offsetLeft,
            width: snakeHead.offsetWidth,
            height: snakeHead.offsetHeight,
            bottom: snakeHead.offsetTop + snakeHead.offsetHeight,
            right: snakeHead.offsetLeft + snakeHead.offsetWidth
        }
        document.querySelectorAll(".snake-tail").forEach(dot => {
            let dotTop = dot.offsetTop;
            let dotLeft = dot.offsetLeft;

            if (snake.top === dotTop && snake.left === dotLeft) {
                props.finishGame();
            }
        })
    }

    useEffect(() => {
        if (!props.gameFinished) {
            setTimeout(function () { move("#snake-head", dir) }, 1000 / props.vel);
            props.setSnakeTail(props.moveSnakeTail());
            moveFlag.current = true;
        }
    }, [snakeHeadTop, snakeHeadLeft]);

    useEventListener("keydown", updateDir);

    return (
        <div id="snake-head" className="snake-dot" style={styler} />
    );
}

export default SnakeHead;