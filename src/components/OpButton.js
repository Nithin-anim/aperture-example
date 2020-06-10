import React from 'react';
import { connect } from 'react-redux';
import {
  SET_OPERATION,
  ADD_NUMBERS,
  SUBTRACT_NUMBERS,
  MULTIPLY_NUMBERS,
  DIVIDE_NUMBERS,
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
      if (currentState.operation === '+') {
        dispatch({ type: ADD_NUMBERS });
        dispatch({ type: SET_OPERATION, payload: operation });
      }
      if (currentState.operation === '-') {
        dispatch({ type: SUBTRACT_NUMBERS });
        dispatch({ type: SET_OPERATION, payload: operation });
      }
      if (currentState.operation === '*') {
        dispatch({ type: MULTIPLY_NUMBERS });
        dispatch({ type: SET_OPERATION, payload: operation });
      }
      if (currentState.operation === '/') {
        dispatch({ type: DIVIDE_NUMBERS });
        dispatch({ type: SET_OPERATION, payload: operation });
      }
    } else if (currentState.operation && operation === '=') {
      let operand1 = currentState.operand1;
      let operand2 = currentState.operand2;
      let operation = currentState.operation;
      ipcRenderer.send('calculate', operand1, operand2, operation);
      ipcRenderer.on('result', (event, result) => {
        dispatch({ type: COMPLETE_CALCULATION, payload: result });
      });

      // if (currentState.operation === '+') {
      //   ipcRenderer.send('calculate', operand1, operand2, operation);
      //   ipcRenderer.on('result', (event, result) => {
      //     dispatch({ type: ADD_NUMBERS, payload: result });
      //   });
      // }
      // if (currentState.operation === '-') {
      //   dispatch({ type: SUBTRACT_NUMBERS });
      // }
      // if (currentState.operation === '*') {
      //   dispatch({ type: MULTIPLY_NUMBERS });
      // }
      // if (currentState.operation === '/') {
      //   dispatch({ type: DIVIDE_NUMBERS });
      // }
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
