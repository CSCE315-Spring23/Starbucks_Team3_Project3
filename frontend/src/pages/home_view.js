import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import Button from '@mui/material/Button';

export default function keypad() {
    return (
        <div>
            <Button variant="contained">1</Button>
        </div>
    );
}

ReactDOM.createRoot(document.querySelector("#app")).render(
    <React.StrictMode>
        <keypad />
    </React.StrictMode>
);