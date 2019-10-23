import React, { Fragment } from 'react';
import spinner from '../../img/eclipse.gif';

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{
        width: '60px',
        marginTop: '25%',
        marginLeft: '50%',
        display: 'block',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      alt='Loading...'
    />
  </Fragment>
);
