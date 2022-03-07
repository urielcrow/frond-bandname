import React, { useCallback } from 'react';
import io from 'socket.io-client';
import { BandAdd } from "./components/BandAdd";
import { BandList } from "./components/BandList";

const connectSocketServer = ()=>{
   return io.connect('http://localhost:8080',{
     transports: ['websocket']
   });
}

function App() {

  const [socket] = React.useState(()=>connectSocketServer());
  const [online, setOnline] = React.useState(false);
  const [bands, setBands] = React.useState([]);
  
  React.useEffect(() => {
    socket.on('connect',()=>{
      setOnline(true);
    });
    socket.on('disconnect',()=>{
      setOnline(false);
    });
  }, [socket]);

  React.useEffect(() => {
    socket.on('list-bands',(bands)=>{
      setBands(bands);
    });
  }, [socket]);

  const addVote = (id)=> socket.emit('increment-vote',id);
  const removeBand=(id)=>socket.emit('delete-band',id);
  const updateNameBand=(id,name)=>socket.emit('update-name-band',{id,name});
  const addBand=(name)=>socket.emit('add-band',name);

  return (
    <div className="container">
      
      <div className="alert">
        <p>
          Service status:
          { online ? <img src="/assets/switchon.png" alt="on" style={{width:80}} /> :   <img src="/assets/switchoff.png" alt="off" style={{width:80}}/> }
        
        </p>
      </div>

      <h1>BandsNAme</h1>
      <hr />

      <div className="row">
        <div className="col-8">
          <BandList bands={bands} addVote={addVote} removeBand={removeBand} updateNameBand={updateNameBand}/>
        </div>
        <div className="col-4">
          <BandAdd addBand={addBand}/>
        </div>
      </div>

    </div>
  );
}

export default App;
