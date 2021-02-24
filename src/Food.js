import React, { useState, useEffect } from 'react';

function Food(props) {
    let [foodTop, setFoodTop] = useState();
    let [foodLeft, setFoodLeft] = useState();
    let [foodDisplay, setFoodDisplay] = useState("none");
    let styler = {
        top: foodTop,
        left: foodLeft,
        display: foodDisplay
    }

    const generateFood = () => {
        let positionChecked, randomTop, randomLeft;

        do {
            positionChecked = true;
            randomTop = Math.round(Math.random() * (props.getOffsetHeight() - 30) / 20) * 20;
            randomLeft = Math.round(Math.random() * (props.getOffsetWidth() - 30) / 20) * 20;
            document.querySelectorAll(".snake-dot").forEach(dot => {
                let dotTop = dot.offsetTop;
                let dotLeft = dot.offsetLeft;
                if (randomTop === dotTop && randomLeft === dotLeft) {
                    positionChecked = false;
                }
            })
        } while (!positionChecked);

        setFoodTop(randomTop);
        setFoodLeft(randomLeft);
        setFoodDisplay("block");
    }

    useEffect(() => {
        generateFood();
    }, []);

    useEffect(() => {
        generateFood();
    }, [props.newFood]);

    return (
        <div className="food" style={styler} />
    );
}

export default Food;