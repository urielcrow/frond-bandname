import {createContext} from 'react';
import {useSocket} from '../hooks/useSocket'



const server = 'http://localhost:8080';

export const SocketContext = createContext();

export const SocketProvider = ({children})=>{
    const { online, socket } = useSocket(server);
    return (
        <SocketContext.Provider value={{online,socket}}>
            {children}
        </SocketContext.Provider>
    )
}





