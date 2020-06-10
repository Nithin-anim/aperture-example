import React from 'react';
import { connect } from 'react-redux';

const History = ({ currentState }) => {
  if (currentState.showHistory) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '15px' }}>
        <h1>History</h1>
        {currentState.history.length === 0 ? (
          <h2 style={{ textAlign: 'center', paddingTop: '15px' }}>
            No history found
          </h2>
        ) : (
          currentState.history.map((ele) => (
            <div className='history-item'>
              {ele.op1} {ele.operation} {ele.op2} = {ele.result}
            </div>
          ))
        )}
      </div>
    );
  } else {
    return <div></div>;
  }
};
const mapStateToProps = (state) => ({
  currentState: state,
});

export default connect(mapStateToProps)(History);
