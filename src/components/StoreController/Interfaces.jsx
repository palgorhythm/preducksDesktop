import React from 'react';
import { useSelector } from 'react-redux';

export default function Interfaces() {
  const interfaces = useSelector(store => store.workspace.storeConfig.interfaces);

  return (
    <>
      <h1>Interfaces</h1>
    </>
  )
};
