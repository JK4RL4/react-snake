import './App.css';

function SnakeTail(props) {
    return (
        <div className="snake-tail snake-dot" style={props.position}></div>
    );
}

export default SnakeTail;