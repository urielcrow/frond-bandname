import React from 'react';
import io from 'socket.io-client';

export const useSocket = (path) => {

    const socket = React.useMemo( ()=> io.connect(path,{
        transports: ['websocket'],
        autoConnect: true,
        auth: { 
            key : 'mi-token'
        }
    }), [path] );

    const [online, setOnline] = React.useState(false);
    
    React.useEffect(() => {
      
      socket.on('connect',()=>{
        setOnline(true);
      });
      socket.on('disconnect',()=>{
        setOnline(false);
      });

    }, [socket]);

    return{
       socket,
       online
    }
}
