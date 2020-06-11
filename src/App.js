import React from 'react';
import './App.css';
import Buttons from './components/Buttons';
import DisplayArea from './components/DisplayArea';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <div className='container'>
          <DisplayArea />
          <Buttons />
        </div>
      </div>
    </Provider>
  );
}

export default App;
