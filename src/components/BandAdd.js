import React from 'react';

export const BandAdd = ({addBand}) => {

    const [state, setstate] = React.useState("");

    const onSubmit = (e)=>{
        e.preventDefault();
        if(state.trim() !== ""){
            addBand(state);
            setstate("");
            
        }
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
