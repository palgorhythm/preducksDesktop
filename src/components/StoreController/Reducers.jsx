import React from 'react'
import ReducersStore from './ReducersStore.tsx';
import ReducersActions from './ReducersActions.tsx';

export default function Reducers() {
  return (
    <>
      <h1>Reducers</h1>
      <ReducersStore />
      <ReducersActions />
    </>
  )
};
