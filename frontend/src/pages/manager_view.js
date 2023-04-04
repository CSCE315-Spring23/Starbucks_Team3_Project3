import React from 'react';

function Button(props) {
    return (
        <button onClick={props.onClick}>
            {props.label}
        </button>
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

function manager_view() {
    function handleClick() {
        alert('button has been clicked.')
    }

    const buttonCol = [
        {
            id: 1,
            onClick: () => handleClick(),
            label: "Switch to Server View"
        },
        {
            id: 2,
            onClick: () => handleClick(),
            label: "Show Inventory"
        },
        {
            id: 3,
            onClick: () => handleClick(),
            label: "Show Low Stock Inventory"
        },
        {
            id: 4,
            onClick: () => handleClick(),
            label: "Show Menu Item List"
        },
        {
            id: 5,
            onClick: () => handleClick(),
            label: "Show Sales"
        },
        {
            id: 6,
            onClick: () => handleClick(),
            label: "Show Transactions"
        },
        {
            id: 7,
            onClick: () => handleClick(),
            label: "Show Employee List"
        },
        {
            id: 8,
            onClick: () => handleClick(),
            label: "Show X/Z Reports"
        }
    ]

    return (
        <div>
            <Column buttonColumn={buttonCol} />
        </div>
    );
}