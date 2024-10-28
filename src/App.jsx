import React from 'react';
import Navbar from './components/Navbar';
import { useState } from 'react';

export default function App() {
  const [account, setAccount] = useState('0x00')
  
  setTimeout(() => {
    setAccount('0x0333')
  }, 4000);

  return <div>
    <Navbar account={account} />
  </div>
}
