import React from 'react';
import App from './App';
import {SocketProvider} from './context/SocketContext';

export const BandNames = () => {
    return (
        <SocketProvider>
            <App />
        </SocketProvider>
    )
}
