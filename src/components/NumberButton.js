import React from 'react';
import { SET_OPERAND } from '../types';
import { connect } from 'react-redux';

const ButtonItem = ({ dispatch, number }) => {
  const onClick = () => {
    dispatch({
      type: SET_OPERAND,
      payload: number,
    });
  };

  return (
    <div className='button' onClick={onClick}>
      <h2>{number}</h2>
    </div>
  );
};

export default connect()(ButtonItem);
