import React, { useState } from 'react';
import { createWallet, getBalance, transferSOL } from './api';

function App() {
  const [wallet, setWallet] = useState({});
  const [balance, setBalance] = useState(0);

  const handleCreateWallet = async () => {
    const res = await createWallet();
    setWallet(res.data);
  };

  const handleGetBalance = async () => {
    const res = await getBalance(wallet.publicKey);
    setBalance(res.data);
  };

  return (
    <div>
      <button onClick={handleCreateWallet}>Cüzdan Oluştur</button>
      <button onClick={handleGetBalance}>Bakiye Sorgula</button>
      <p>Cüzdan: {wallet.publicKey}</p>
      <p>Bakiye: {balance} SOL</p>
    </div>
  );
}

export default App;
