import React, { useState } from 'react';
import { createWallet, getBalance } from './api';
import './App.css'; // assuming you have a custom CSS file for styling

function App() {
  const [wallet, setWallet] = useState({});
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleCreateWallet = async () => {
    setLoading(true);
    try {
      const res = await createWallet();
      setWallet(res.data);
    } catch (error) {
      alert('Cüzdan oluşturulurken hata oluştu!');
    } finally {
      setLoading(false);
    }
  };

  const handleGetBalance = async () => {
    if (!wallet.publicKey) {
      alert('Önce bir cüzdan oluşturun.');
      return;
    }
    setLoading(true);
    try {
      const res = await getBalance(wallet.publicKey);
      setBalance(res.data);
    } catch (error) {
      alert('Bakiye sorgulanırken hata oluştu!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="button-container">
        <button className="action-button" onClick={handleCreateWallet} disabled={loading}>
          {loading ? 'Cüzdan Oluşturuluyor...' : 'Cüzdan Oluştur'}
        </button>
        <button className="action-button" onClick={handleGetBalance} disabled={loading}>
          {loading ? 'Bakiye Sorgulanıyor...' : 'Bakiye Sorgula'}
        </button>
      </div>
      {wallet.publicKey && (
        <div className="wallet-info">
          <p><strong>Cüzdan:</strong> {wallet.publicKey}</p>
          <p><strong>Bakiye:</strong> {balance} SOL</p>
        </div>
      )}
    </div>
  );
}

export default App;
