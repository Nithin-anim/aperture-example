import React from 'react';
import './App.css';
import Buttons from './components/Buttons';
import DisplayArea from './components/DisplayArea';
import { Provider } from 'react-redux';
import store from './store';
// import History from './components/History';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <div className='container'>
          <DisplayArea />
          <Buttons />
          {/* <History /> */}
        </div>
      </div>
    </Provider>
  );
}

export default App;
