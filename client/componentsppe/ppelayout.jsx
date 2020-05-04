import React from 'react';
// import PPEHeader from '../componentsppe/ppeheader';

export default function PPELayOut(props) {
  return (
    <div>
      {/* <PPEHeader ppeCartItemCount={ppeCart.length} /> */}
      {props.children}
      {/* <PPEFooter /> */}
    </div>
  );
}
