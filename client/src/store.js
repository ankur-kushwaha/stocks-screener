import React, {createContext, useReducer} from 'react';

const initialState = {
  stocksList:{}
};

function reducer(state, action){
  switch(action.type){
    case 'STOCKS_REC_LIST':{
      let newState = {...state};
      newState.stocksList = action.payload;
      newState.selectedStock = Object.keys(action.payload)[0]
      console.log(newState);
      return newState;
    }
    case 'STOCK_SELECTED':{
      let newState = {...state};
      newState.selectedStock = action.payload;
      return newState;
    }
    default:{
      return state;
    }
  }
};


const AppContext = createContext(initialState);
const { Provider } = AppContext;

const StateProvider = ( { children } ) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    return <Provider value={{ state, dispatch }}>{children}</Provider>;
  };
  
  
  export { AppContext, StateProvider }