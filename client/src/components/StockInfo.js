import React from 'react'
import GaugeChart from 'react-gauge-chart';
import { AppContext } from '../store';

export default function StockInfo() {
    let {state:{stocksList,selectedStock}} = React.useContext(AppContext);
    let stock = stocksList[selectedStock];
    if(!stock){
        return <></>
    }

    let otherInfoData = [
        {
            title:"Signal",
            key:"signal"
        },
        {
            title:"Signal Age",
            key:"signalAge"
        },
        {
            title:"Trend",
            key:"trend"
        },
        {
            title:"Low %",
            key:"low"
        },
        {
            title:"High %",
            key:"high"
        },
        {
            title:"MaxChange %",
            key:"maxChange"
        },
        {
            title:"Change",
            key:"change"
        },
        {
            title:"PE",
            key:"pe"
        },
        {
            title:"EPS",
            key:"eps"
        },
        {
            title:"52 Week Low",
            key:"52WeekLow"
        },
        {
            title:"52 Week High",
            key:"52WeekHigh"
        },
        {
            title:"LTP",
            key:"ltp"
        }
    ]

    let signal = stock?.signal || 'HOLD';
    let config = {
        BUY: {
            guageValue: 0.8,
            color: '#25de25'
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
    
    return (
        <div className="stock-info">
            
            <div className="info">
                <div className="stock-code">
                    {stock.instrument}
                </div>
                <div className="other-info">
                    {otherInfoData.map(item=>(
                        <div className="item" key={item.key}><div className="key">
                        {item.title}
                        </div>
                        <div className="val">
                            {stock[item.key]}
                        </div></div>
                    ))}
                    
                </div>
            </div>
            
            <div className="box">
                <GaugeChart
                    arcWidth={0.5} 
                    colors={['red', 'yellow', 'green']}
                    percent={config[signal].guageValue}
                    hideText
                    needleColor={'white'}
                    id="gauge-chart1" />

                <div className="gauge-text" style={{ color: config[signal].color }}>
                    {signal}
                </div>
            </div>
        </div>
    )
}
