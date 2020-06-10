import {
  SET_OPERAND,
  SET_OPERATION,
  ADD_NUMBERS,
  SUBTRACT_NUMBERS,
  MULTIPLY_NUMBERS,
  DIVIDE_NUMBERS,
  CLEAR_DATA,
  TOGGLE_HISTORY,
  COMPLETE_CALCULATION,
} from './types';

const initialState = {
  operand1: 0,
  operand2: 0,
  operation: null,
  hasFirstOperand: false,
  hasOperation: false,
  displayValue: null,
  result: null,
  prevResult: null,
  history: [],
  showHistory: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_OPERAND:
      if (!state.hasFirstOperand) {
        return {
          ...state,
          operand1: state.operand1 * 10 + action.payload,
          displayValue: state.operand1 * 10 + action.payload,
        };
      } else {
        return {
          ...state,
          operand2: state.operand2 * 10 + action.payload,
          displayValue: state.operand2 * 10 + action.payload,
        };
      }
    case SET_OPERATION:
      if (state.prevResult) {
        return {
          ...state,
          operation: action.payload,
          displayValue: '',
          operand1: state.prevResult,
          hasFirstOperand: true,
          hasOperation: true,
        };
      } else {
        return {
          ...state,
          operation: action.payload,
          displayValue: '',
          hasFirstOperand: true,
          hasOperation: true,
        };
      }

    case COMPLETE_CALCULATION:
      return {
        ...state,
        result: action.payload,
        displayValue: action.payload,
        prevResult: action.payload,
        operand1: 0,
        operand2: 0,
        operation: null,
        hasFirstOperand: false,
        hasOperation: false,
      };

    case ADD_NUMBERS:
      // let add_result = state.operand1 + state.operand2;
      // let add_obj = {
      //   op1: state.operand1,
      //   op2: state.operand2,
      //   operation: state.operation,
      //   result: add_result,
      // };

      return {
        ...state,
        result: action.payload,
        displayValue: action.payload,
        prevResult: action.payload,
        operand1: 0,
        operand2: 0,
        operation: null,
        hasFirstOperand: false,
        hasOperation: false,
        // history: [...state.history, action.payload],
      };

    case SUBTRACT_NUMBERS:
      return {
        ...state,
        result: action.payload,
        displayValue: action.payload,
        prevResult: action.payload,
        operand1: 0,
        operand2: 0,
        operation: null,
        hasFirstOperand: false,
        hasOperation: false,
        // history: [...state.history, sub_obj],
      };

    case MULTIPLY_NUMBERS:
      return {
        ...state,
        result: action.payload,
        displayValue: action.payload,
        prevResult: action.payload,
        operand1: 0,
        operand2: 0,
        operation: null,
        hasFirstOperand: false,
        // history: [...state.history, mul_obj],
      };

    case DIVIDE_NUMBERS:
      return {
        ...state,
        result: action.payload,
        displayValue: action.payload,
        prevResult: action.payload,
        operand1: 0,
        operand2: 0,
        operation: null,
        hasFirstOperand: false,
        // history: [...state.history, div_obj],
      };

    case CLEAR_DATA:
      return {
        ...state,
        operand1: 0,
        operand2: 0,
        operation: null,
        hasFirstOperand: false,
        displayValue: null,
        result: null,
        prevResult: null,
      };

    case TOGGLE_HISTORY:
      return {
        ...state,
        showHistory: !state.showHistory,
      };

    default:
      return state;
  }
};
