import React from 'react';
import PPEHeader from '../componentsppe/ppeheader';
import PPEFooter from '../componentsppe/ppefooter';

export default function PPELayOut(props) {
  return (
    <div className="ppe-bg overflow-auto">
      <PPEHeader ppeCartItemCount={props.ppeCartItemCount} />
      {props.children}
      <PPEFooter />
    </div>
  );
}
