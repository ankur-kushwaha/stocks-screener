import React, { useContext } from 'react'
import useSheet from '../hooks/useSheet'
import { AppContext } from '../store'
import Main from './Main'
import Sidebar from './Sidebar'

export default function Container() {

    const {dispatch} = useContext(AppContext);

    const {getStocksData} = useSheet()    

    React.useEffect(()=>{
        async function asyncFn(){
            try{
            let data = await getStocksData()
            console.log(data);
            dispatch({
                type:"STOCKS_REC_LIST",
                payload:data
            })
            }catch(e){
                console.log(e)
            }
        }
        asyncFn()
        
    },[]);

    return (
        <div className="container">
           <Main></Main>
           <Sidebar></Sidebar>
        </div>
    )
}
