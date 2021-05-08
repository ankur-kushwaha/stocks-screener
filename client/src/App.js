import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Container from './components/Container';
import {StateProvider} from './store'

function App() {

  return (
    <div className="App">
      <StateProvider>
    <Container/>
    </StateProvider>
    </div>
  );
}

export default App;
