import React, { useEffect, useState, useRef } from 'react';

function SnakeHead(props) {
    let [snakeHeadTop, setSnakeHeadTop] = useState(0);
    let [snakeHeadLeft, setSnakeHeadLeft] = useState(0);
    let snakeNewMove = props.snakeMove.slice();
    let [dir, setDir] = useState("right");
    let refDir = useRef("right");
    let snakeHeadMovement;
    let styler = {
        top: snakeHeadTop,
        left: snakeHeadLeft
    }

    document.addEventListener("keydown", function (e) {
        let newDir;

        switch (e.key) {
            case "ArrowUp":
                newDir = setNewDir("up");
                break;
            case "ArrowDown":
                newDir = setNewDir("down");
                break;
            case "ArrowRight":
                newDir = setNewDir("right");
                break;
            case "ArrowLeft":
                newDir = setNewDir("left");
                break;
            default:
                newDir = dir;
                break;
        }
        if (newDir !== dir) {
            setDir(newDir);
            refDir.current = newDir;
        }
    });

    const setNewDir = (newDir) => {
        let actualDir = refDir.current;

        if ((actualDir === "up" && newDir === "down") ||
            (actualDir === "down" && newDir === "up") ||
            (actualDir === "right" && newDir === "left") ||
            (actualDir === "left" && newDir === "right")) {
            return actualDir;
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
        props.setSnakeMove(snakeNewMove);

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
            alert("Has perdido");
            window.location.reload();
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
                alert("Has perdido");
                window.location.reload();
            }
        })
    }

    useEffect(() => {
        snakeHeadMovement = setTimeout(function () { move("#snake-head", dir) }, 1000 / props.vel);
        props.setSnakeTail(props.moveSnakeTail());
        checkSnakeCollision();
    }, [snakeHeadTop, snakeHeadLeft]);

    return (
        <div id="snake-head" className="snake-dot" style={styler} />
    );
}

export default SnakeHead;