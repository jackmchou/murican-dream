import React from 'react';
import PPEHeader from '../componentsppe/ppeheader';
import PPEFooter from '../componentsppe/ppefooter';
import Title from '../components/title';

export default function PPELayOut(props) {
  return (
    <main className="ppe-bg overflow-auto">
      <Title pageTitle="PPE Agora"/>
      <PPEHeader ppeCartItemCount={props.ppeCartItemCount} />
      {props.children}
      <PPEFooter />
    </main>
  );
}
