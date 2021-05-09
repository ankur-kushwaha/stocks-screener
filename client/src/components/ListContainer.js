import React from 'react'
import { AppContext } from '../store'
import {firstBy} from "thenby";
import { FiX,FiChevronDown,FiChevronUp } from "react-icons/fi";
import TopMenu from './TopMenu';
import StockInfo from './StockInfo';



export default function ListContainer() {

    let {state:{stocksList},dispatch} = React.useContext(AppContext);
    let defaultSort = {
        key:'signal',
        direction:"asc"
    }
    const [sortList, setSortList] = React.useState([
        defaultSort
    ]);
    const [list, setList] = React.useState([]);
    
    
    React.useEffect(()=>{
        let absMap = ['low','high','maxChange']
        let sortFn = firstBy('null');
        for(let sort of sortList){
            let sortKey = sort.key;
            
            if(absMap.indexOf(sortKey) !== -1 ){
                sortKey += 'Abs'
            }
            sortFn = sortFn.thenBy(sortKey, {direction: sort.direction})
        }
        sortFn = sortFn.thenBy('signalAge',{direction: 'desc'})
        let list=Object.values(stocksList)
        .sort(sortFn);
        setList(list)
    },[sortList,stocksList])

    if(!stocksList){
        return <></>
    }
    

    const sort = (key)=> ()=>{
        let newSortList = [...sortList]
        let index = newSortList.findIndex(item=>item.key === key)
        let sort={
            key,
            direction :'asc'
        }
        if(index >= 0){
            let deletedSort = newSortList.splice(index,1);
            if(index === 0){
                sort.direction = deletedSort[0]?.direction === 'asc'?'desc':'asc';
            }
        }
        
        newSortList.unshift(sort);
        if(newSortList.length > 2){
            // newSortList.length = 2;
        }
        setSortList(newSortList)
        console.log(JSON.stringify(newSortList));
        
    }

    let headerData=[
        {},
        {
            title:"Stock",
            key:"instrument",
            class:"name"
        },
        {
            title:"Low",
            key:"low",
            class:"name"
        },
        {
            title:"LTP",
            key:"ltp",
            class:"name"
        },
        {
            title:"High",
            key:"high",
            class:"name"
        },
        
        {
            title:"Change",
            key:"maxChange",
            class:"name"
        },
        {
            title:"Trend",
            key:"trend",
            class:"name"
        },
        {
            title:"Recommendation",
            key:"signal",
            class:"value"
        }
    ]
    const headerDataMap = headerData.reduce((a,b)=>{
        a[b.key] = b;
        return a;
    },{})

    const removeSort = (key) =>()=>{
        let newSortList = [...sortList]
        let index = newSortList.findIndex(item=>item.key === key);
        newSortList.splice(index,1);    
        if(newSortList.length === 0){
            newSortList.push(defaultSort)
        } 

        setSortList(newSortList);
    }

    const toggleDirection = (key)=>()=>{
        let newSortList = [...sortList]
        let index = newSortList.findIndex(item=>item.key === key);
        newSortList[index].direction =newSortList[index].direction == 'asc'?'desc':'asc'    
        setSortList(newSortList);
    } 

    function selectStock(e){
        let key = e.currentTarget.dataset.key;
        console.log(key);
        dispatch({
            type:"STOCK_SELECTED",
            payload:key
        })
    }

    return (
        <div className="list-container">
            <TopMenu></TopMenu> 
            <StockInfo></StockInfo>
            <section class="sort-order">
                <span>Sort Order: </span>
                {sortList.map(item=>(
                    <span  className="item">
                        <span onClick={toggleDirection(item.key)}>
                        {headerDataMap[item.key].title}
                        </span>
                        
                        <span className="icon" >
                        {item.direction === 'desc' ?
                        <FiChevronUp></FiChevronUp>:
                        <FiChevronDown></FiChevronDown>
                }
                        
                        </span>
                        <span className="icon" onClick={removeSort(item.key)}>
                        
                        <FiX></FiX>

                        </span>
                        
                    </span>
                ))}
            </section>
            <section class="list-section">
            <table className="list-table" cellSpacing={0}>
                <thead>
                    <tr>
                        {headerData.map(item=>(
                            <th className={item.class}
                            onClick={sort(item.key)}>
                                {item.title}
                            </th>
                        ))}

                    <th>
                    </th>
                    </tr>
                </thead>
                <tbody>
            {list.map((item,i)=>(
                <tr key={item.instrument} data-key={item.instrument} className="list-item" onClick={selectStock}>
                    <td className="id">
                        {i+1}.
                    </td>
                    <td className="name">
                        <div>
                            {item.instrument}
                        </div>
                        <div className="subtitle">
                           % chg: {item.change}
                        </div>
                    </td>
                    
                    
                    <td className="name">
                        <div>
                            {item.low}
                        </div>
                        <div className="subtitle">
                            {item['52WeekLow']}
                        </div>
                    </td>
                    <td className="name">
                    <div>
                            {item.ltp}
                        </div>
                    </td>
                    <td className="name">
                        <div>
                            {item.high}

                        </div>
                        <div className="subtitle">
                            {item['52WeekHigh']}
                        </div>
                    </td>
                    
                    <td className="name">
                        <div>
                            {item.maxChange}
                        </div>
                        
                    </td>
                    <td className="name">
                        <div>
                            {item.trend}
                        </div>
                        
                    </td>
                    
                    <td className={"value " +item.signal.toLowerCase()}>
                        {item.signal}
                        <div className="subtitle">
                           Signal Age: {item.signalAge}
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
            </table>
            </section>
        </div>
    )
}
