import React,{useContext}from 'react';
import { SocketContext } from '../context/SocketContext';

export const BandList = (() => {

    const {socket } = useContext(SocketContext);
   
    const [bands, setBands] = React.useState([]);

    React.useEffect(() => {
        socket.on('list-bands',(bands)=>{
        setBands(bands);
        });
    }, [socket]);

    const [nombreAnterior, setNombreAnterior] = React.useState("");

    const onChange = (event)=>{
        setBands(
            bands.map( band =>{
                if( band.id === event.target.name )
                    return { ...band, name : event.target.value};
                else
                    return band;
            })
        );
    }

    const addVote = (id)=> socket.emit('increment-vote',id);
    const removeBand=(id)=>socket.emit('delete-band',id);
    const updateNameBand=(id,name)=>socket.emit('update-name-band',{id,name});
   
    const onBlur=(event)=>{
        if(nombreAnterior !== event.target.value){
            console.log(event.target.name);
            console.log(event.target.value);
            updateNameBand(event.target.name,event.target.value);
        }
    }

    const onFocus=(event)=>{
        setNombreAnterior(event.target.value)
    }

    return (
        <>
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Votos</th>
                        <th>Borrar</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bands.map( band => (
                            <tr key={band.id}>
                                <td>
                                    <button className="btn btn-primary" onClick={()=>addVote(band.id)}> +1 </button>
                                </td>
                                <td>
                                    <input className="form-control" value={band.name} onChange={onChange} name={band.id} onBlur={onBlur} onFocus={onFocus}/>
                                </td>
                                <td>
                                    <h3>{band.votes}</h3>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={()=>removeBand(band.id)}> Borrar </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>
        </>
    )
});
