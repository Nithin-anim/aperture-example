import React from 'react';
import { connect } from 'react-redux';

const InputArea = ({ currentState }) => {
  return <div className='input-area'>{currentState.displayValue}</div>;
};

const mapStateToProps = (state) => ({
  currentState: state,
});

export default connect(mapStateToProps)(InputArea);
