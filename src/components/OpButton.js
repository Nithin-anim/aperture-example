import React from 'react';
import { connect } from 'react-redux';
import {
  SET_OPERATION,
  CLEAR_DATA,
  TOGGLE_HISTORY,
  COMPLETE_CALCULATION,
} from '../types';
const { ipcRenderer } = window;

const OpButton = ({ currentState, dispatch, operation }) => {
  const onClick = () => {
    console.log('OPERAND');
    if (
      operation !== 'C' &&
      operation !== 'H' &&
      operation !== '=' &&
      !currentState.hasOperation
    ) {
      dispatch({ type: SET_OPERATION, payload: operation });
    } else if (operation === 'C') {
      dispatch({ type: CLEAR_DATA });
    } else if (operation === 'H') {
      dispatch({ type: TOGGLE_HISTORY });
    } else if (currentState.hasOperation && operation !== '=') {
      let operand1 = currentState.operand1;
      let operand2 = currentState.operand2;
      let currentOperation = currentState.operation;
      ipcRenderer.send('calculate', operand1, operand2, currentOperation);
      ipcRenderer.on('result', (event, result) => {
        dispatch({ type: COMPLETE_CALCULATION, payload: result });
        dispatch({ type: SET_OPERATION, payload: operation });
      });
    } else if (currentState.operation && operation === '=') {
      let operand1 = currentState.operand1;
      let operand2 = currentState.operand2;
      let currentOperation = currentState.operation;
      ipcRenderer.send('calculate', operand1, operand2, currentOperation);
      ipcRenderer.on('result', (event, result) => {
        dispatch({ type: COMPLETE_CALCULATION, payload: result });
      });
    }
  };
  return (
    <div className='button' onClick={onClick}>
      <h2>{operation}</h2>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentState: state,
});

export default connect(mapStateToProps)(OpButton);
