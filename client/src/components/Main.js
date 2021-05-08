import React from 'react'
import GaugeChart from 'react-gauge-chart'
import { AppContext } from '../store'


export default function Main() {
    let { state } = React.useContext(AppContext);

    let data = {
        stockName: state.selectedStock,
        change: "4%",
    }
    let selectedStock = state.stocksList[state.selectedStock];
    if(!selectedStock){
        return<></>
    }
    let signal = selectedStock?.signal || 'HOLD';
    let config = {
        BUY: {
            guageValue: 0.8,
            color: 'green'
        },
        HOLD: {
            guageValue: 0.5,
            color: 'yellow'
        },
        SELL: {
            guageValue: 0.2,
            color: 'red'
        }
    }

    let attributes=[{
        key:"instrument",
        name:"Instrument"
    },{
        key:"signalAge",
        name:"Age"
    },
    {
        key:"trend",
        name:"Trend"
    },
    {
        key:"high",
        name:"High"
    },
    {
        key:"low",
        name:"Low"
    },
    {
        key:"maxChange",
        name:"Max Change"
    }]


    return (
        <div className="main">
            <div className="title">
                {data.stockName}
            </div>
            <GaugeChart
                colors={['red', 'yellow', 'green']}
                percent={config[signal].guageValue}
                hideText
                needleColor={'white'}
                id="gauge-chart1" />

            <div className="gauge-text" style={{ color: config[signal].color }}>
                {signal}
            </div>
            <div className="other-information">
                {attributes.map(item => (
                    <Attribute name={item.name} key={item.key} value={selectedStock[item.key]} />
                ))}
            </div>
        </div>
    )
}

function Attribute({ name, value }) {


    return (
        <div className="attribute">
            <div className="name">
                {name}
            </div>
            <div className="value">
                {value}
            </div>
        </div>
    )
}
