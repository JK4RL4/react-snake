import './App.css';
import React, { useState } from 'react';
import BoardGame from './BoardGame';
import GameControl from './GameControl';

function App() {
  let [vel, setVel] = useState(5);
  let [start, setStart] = useState(false);
  return (    
    <>
    <GameControl setVel={setVel} setStart={setStart} /> 
    <BoardGame vel={vel} start={start} setVel={setVel} />
    </>
  );
}

export default App;
