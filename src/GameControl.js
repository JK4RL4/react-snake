import './App.css';

function GameControl(props) {
    const startGame = (e) => {
        let difficulty = parseInt(document.querySelector("#difficulty").value);
        props.setVel(difficulty);
        props.setStart(true);
        e.target.disabled = true;
    }

    return (
        <>
        <h1 className="title">REACT SNAKE</h1>
        <div className="control">
            <p>Dificultad:</p>
            <select name="difficulty" id="difficulty">
                <option value="5">1</option>
                <option value="10">2</option>
                <option value="15">3</option>
            </select>
            <button onClick={e => startGame(e)}>START</button>
        </div>
        </>
    );
}

export default GameControl;