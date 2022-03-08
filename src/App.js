import React,{useContext} from 'react';
import { BandAdd } from "./components/BandAdd";
import { BandList } from "./components/BandList";
import { SocketContext } from './context/SocketContext';
import { BandCharts } from './components/BandCharts';



function App() {

  const {online} = useContext(SocketContext);

  return (
    <div className="container">
      
      <div className="alert">
        <p>
          Service status:
          { online ? <img src="/assets/switchon.png" alt="on" style={{width:80}} /> : <img src="/assets/switchoff.png" alt="off" style={{width:80}}/> }
        </p>
      </div>

      <h1>BandsNAme</h1>
      <hr />


      <div className="row">
        <div className="col-12">
          <BandCharts/>
        </div>
        <div className="col-8">
          <BandList/>
        </div>
        <div className="col-4">
          <BandAdd/>
        </div>
      </div>

    </div>
  );
}

export default App;
