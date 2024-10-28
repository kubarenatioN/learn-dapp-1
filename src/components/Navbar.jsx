import React from 'react';
import bank from '../bank.png';

export default function Navbar({ account }) {

  return <nav className='navbar fixed-top shadow p-0'
    style={{
    height: 50
    }}>
    <a className='navbar-brand col-sm-3 col-md-2 mr-0' href='/'>
      <img src={bank} alt="Logo" width={50} height={30} className='d-inline-block align-top' />
      DAPP Yield Staking (DecBanking)
    </a>
    <ul className='navbar-nav px-3'>
      <li>
        <small>
          Account Number: {account}
        </small>
      </li>
    </ul>
  </nav>
}