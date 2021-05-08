import {camelCase} from 'change-case';


function useSheet(){

    function parseSheet(res){
        let title = res.shift().map(item=>camelCase(item));        
        let out = res.reduce((acc,row)=>{
            let entry =  row.reduce((a,b,index)=>{
                a[title[index]]=b;
                return a;
            },{})
            acc[entry.instrument] = entry;
            return acc;
        },{})
        return out;
    }

    function getStocksData(){
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