import React from 'react'
import {AppContext } from '../store'

export default function Sidebar() {

    let {state,dispatch} = React.useContext(AppContext)
    let [data,setData] = React.useState([]);
    let [filterText,setFilterText] = React.useState("");

    React.useEffect(()=>{
        let data = Object.keys(state.stocksList)
        .filter(item=>item.toLowerCase().indexOf(filterText.toLowerCase()) !== -1)
        .map(stockCode=>{
            return {
                stockCode,
                price:state.stocksList[stockCode].change
            }
        })
        setData(data);
    },[state.stocksList,filterText])

    

    function handleClick(stockCode){
        dispatch({
            type:"STOCK_SELECTED",
            payload: stockCode
        })
    }

    function handleChange(e){
        setFilterText(e.target.value);
    }

    return (
        <div className="sidebar">
            <div className="title">
                SHORTCUTS
            </div>

            <div className="search">
                <input type="text" value={filterText} onChange={handleChange}/>
            </div>

            <div className="stock-list">
                {data.map(item=>(
                    <SidebarItem key={item.stockCode} stockCode={item.stockCode} price={item.price} onClick={handleClick}>
                    </SidebarItem>
                ))}
            </div>
        </div>
    )
}

function SidebarItem({stockCode,price, onClick}){
    function handleClick(){
        onClick(stockCode)
    }
    return (
        <div onClick={handleClick} className="sidebar-item">
            <div className="stockCode">
                {stockCode}
            </div>
            <div className="price">
                {price}
            </div>
        </div>
    )
}
