import { useState } from 'react';

function Button(props) {
    return (
        <button onClick={props.onClick}>
            {props.label}
        </button>
    );
}

function Row(props) {
    return (
        <div style={{ display: 'flex' }}>
            {props.buttons.map(button => (
                <Button
                    key={button.id}
                    onClick={button.onClick}
                    label={button.label}
                />
            ))}
        </div>
    );
}

function Column(props) {
    return (
        <div style={{float: 'left'}}>
            {props.buttons.map(button => (
                <Button
                    key={button.id}
                    onClick={button.onClick}
                    label={button.label}
                />
            ))}
        </div>
    );
}

function server_view() {
    function handleClick() {
        alert("This button has been clicked.")
    }

    const buttonRow = [
        {
            id: "coffee-view",
            onClick: () => handleClick(),
            label: "Coffee View"
        },
        {
            id: "espresso-view",
            onClick: () => handleClick(),
            label: "Espresso View"
        },
        {
            id: "blended-view",
            onClick: () => handleClick(),
            label: "Blended View"
        },
        {
            id: "tea-view",
            onClick: () => handleClick(),
            label: "Tea View"
        },
        {
            id: "coffee-alt-view",
            onClick: () => handleClick(),
            label: "Coffee Alternatives View"
        },
        {
            id: "food-view",
            onClick: () => handleClick(),
            label: "Food View"
        }
    ]

    const buttonCol = [
        {
            id: "venti-button",
            onClick: () => handleClick(),
            label: "Venti"
        },
        {
            id: "grande-button",
            onClick: () => handleClick(),
            label: "Grande"
        },
        {
            id: "tall-button",
            onClick: () => handleClick(),
            label: "Tall"
        }
    ]

    return (
        <div>
            <Row buttonRow={buttonRow} />
            <Column buttonCol={buttonCol} />
        </div>
    );
}