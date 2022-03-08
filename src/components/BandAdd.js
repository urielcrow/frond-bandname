import React,{useContext}from 'react';
import { SocketContext } from '../context/SocketContext';

export const BandAdd = () => {

    const {socket } = useContext(SocketContext);
   
    const [state, setstate] = React.useState("");

    const onSubmit = (e)=>{
        e.preventDefault();
        if(state.trim() === "")
            return;
        socket.emit('add-band',state);
        setstate(""); 
    }

    return (
        <>
            <h3>Agregar banda</h3>
            <form onSubmit={onSubmit}>
                <input className="form-control" placeholder="Nueva banda" value={state} onChange={ (e)=>setstate(e.target.value) }/>
            </form>
        </>
    );
}
