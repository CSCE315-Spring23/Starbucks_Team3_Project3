import ReactDOM from 'react-dom';
import React from "react";

function Square({value, onSquareClick}) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}

function Keypad() {
    function handleClick(i) {
        if (i === -1) {
            alert("The non-integer button has been clicked")
        } else {
            alert("Button " + i + " has been clicked.")
        }
    }

    return (
        <>
            <div className="keypadRow1">
                <Square value={1} onSquareClick={() => handleClick(1)} />
                <Square value={2} onSquareClick={() => handleClick(2)} />
                <Square value={3} onSquareClick={() => handleClick(3)} />
            </div>
            <div className="keypadRow2">
                <Square value={4} onSquareClick={() => handleClick(4)} />
                <Square value={5} onSquareClick={() => handleClick(5)} />
                <Square value={6} onSquareClick={() => handleClick(6)} />
            </div>
            <div className="keypadRow3">
                <Square value={7} onSquareClick={() => handleClick(7)} />
                <Square value={8} onSquareClick={() => handleClick(8)} />
                <Square value={9} onSquareClick={() => handleClick(9)} />
            </div>
            <div className="keypadRow4">
                <Square value={"CLR"} onSquareClick={() => handleClick(-1)} />
                <Square value={0} onSquareClick={() => handleClick(0)} />
                <Square value={"ENT"} onSquareClick={() => handleClick(-1)} />
            </div>
        </>
    );
}

ReactDOM.render(<Keypad />, document.getElementById('keypad'));