import React, { useContext } from 'react'
import ListContainer from '../components/ListContainer'
import Menu from '../components/LeftMenu'
import {useParams} from 'react-router-dom';

import useSheet from '../hooks/useSheet'
import { AppContext } from '../store'

export default function ListPage() {

    const {dispatch} = useContext(AppContext);
    const {getStocksData} = useSheet();   
    let { recommendType } = useParams();


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
        
    },[dispatch,recommendType]);

    return (
        <div className="list-page">
            
            <Menu>
                    
            </Menu>
            
            <ListContainer>
                
            </ListContainer>
        </div>
    )
}
