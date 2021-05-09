import {camelCase} from 'change-case';
import response from './response.json';
import {useParams} from 'react-router-dom';

function useSheet(){
    let { recommendType } = useParams();
    console.log(recommendType);


    function parseSheet(res){
        console.log('parsign sheet');
        let title = res.shift().map(item=>camelCase(item));        
        let out = res
        .map((row)=>{
            let entry =  row.reduce((a,b,index)=>{
                a[title[index]]=b;
                return a;
            },{})
            entry['highAbs'] = Number(entry['high'].substr(0,entry['high'].length-1));
            entry['maxChangeAbs'] = Number(entry['maxChange'].substr(0,entry['maxChange'].length-1));
            entry['lowAbs'] = Number(entry['low'].substr(0,entry['low'].length-1));
            entry['signalAge'] = Number(entry['signalAge']);

            return entry;
        })
        .filter(item=>{
            if(!recommendType){
                return true;
            }
            return item.signal === recommendType.toUpperCase()
        })
        .reduce((a,b)=>{
            a[b.instrument] = b;
            return a;
        },{})
        return out;
    }

    function getStocksData(){
        // return Promise.resolve(parseSheet(response));
        return fetch('https://us-central1-stocksscreener-312916.cloudfunctions.net/app/stocksRecommendation')
        .then(res=>res.json())
        .then(res=>{
            return parseSheet(res)
        })
    }
    return {
        getStocksData
    }
}

export default useSheet;