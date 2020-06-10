import React, { Fragment } from 'react';
import NumberButton from './NumberButton';
import OpButton from './OpButton';

const Buttons = () => {
  return (
    <Fragment>
      <div className='row'>
        <NumberButton number={1} />
        <NumberButton number={2} />
        <NumberButton number={3} />
      </div>
      <div className='row'>
        <NumberButton number={4} />
        <NumberButton number={5} />
        <NumberButton number={6} />
      </div>
      <div className='row'>
        <NumberButton number={7} />
        <NumberButton number={8} />
        <NumberButton number={9} />
      </div>
      <div className='row'>
        <OpButton operation={'/'} />
        <NumberButton number={0} />
        <OpButton operation={'='} />
      </div>
      <div className='row'>
        <OpButton operation={'+'} />
        <OpButton operation={'-'} />
        <OpButton operation={'*'} />
      </div>
      <div className='row'>
        <OpButton operation={'C'} />
      </div>
    </Fragment>
  );
};

export default Buttons;
