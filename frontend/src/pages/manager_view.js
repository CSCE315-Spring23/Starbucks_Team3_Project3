import "../App.css";
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";


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
            id: "server-view",
            onClick: () => handleClick(),
            label: "Switch to Server View"
        },
        {
            id: "inventory-view",
            onClick: () => handleClick(),
            label: "Show Inventory"
        },
        {
            id: "low-stock-view",
            onClick: () => handleClick(),
            label: "Show Low Stock Inventory"
        },
        {
            id: "menu-item-view",
            onClick: () => handleClick(),
            label: "Show Menu Item List"
        },
        {
            id: "sales-view",
            onClick: () => handleClick(),
            label: "Show Sales"
        },
        {
            id: "transactions-view",
            onClick: () => handleClick(),
            label: "Show Transactions"
        },
        {
            id: "employee-list-view",
            onClick: () => handleClick(),
            label: "Show Employee List"
        },
        {
            id: "reports-view",
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

export default Manager;