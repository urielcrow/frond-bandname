import React,{useContext}from 'react';
import { SocketContext } from '../context/SocketContext';
import {Chart,registerables} from 'chart.js';
Chart.register(...registerables);

export const BandCharts = () => {

    const ctx = React.useRef(null);

    const {socket } = useContext(SocketContext);
   
    const [bands, setBands] = React.useState([]);
    const [chart,setChart] = React.useState(null);

    const colors = [ 'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'];

    const borderColors = ['rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'];

    React.useEffect(() => {
        socket.on('list-bands',(bands)=>{
            setBands(bands);
        });
    }, [socket]);
    
    React.useEffect(() => {

        if(chart)
            chart.destroy();
        
        const names = [];
        const votes = [];
        
        bands.forEach(e=>{
            names.push(e.name);
            votes.push(e.votes);
        })
        
        const myChart = new Chart(ctx.current, {
            type: 'bar',
            data: {
                labels: names,
                datasets: [{
                    label: '# of Votes',
                    data: votes,
                    backgroundColor: colors,
                    borderColor: borderColors,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        setChart(myChart);

    }, [bands])

    return (
        <>
            <canvas ref={ctx}></canvas>
        </>
    )
}
