import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

// Cüzdan Oluştur
export const createWallet = async () => api.post('/wallet/create');

// Bakiye Görüntüle
export const getBalance = async (publicKey) => api.get(`/wallet/balance/${publicKey}`);

// SOL Transferi
export const transferSOL = async (fromSecret, toPublicKey, amount) => 
  api.post('/transaction/transfer', { fromSecret, toPublicKey, amount });
