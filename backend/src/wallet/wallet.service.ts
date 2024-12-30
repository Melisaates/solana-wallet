import { Injectable } from '@nestjs/common';
import { Keypair, Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';

@Injectable()
export class WalletService {
  private connection: Connection;

  constructor() {
    this.connection = new Connection(clusterApiUrl('devnet'));
  }

  createWallet() {
    const keypair = Keypair.generate();
    return {
      publicKey: keypair.publicKey.toString(),
      privateKey: Array.from(keypair.secretKey),
    };
  }

  async getBalance(publicKey: string): Promise<number> {
    const balance = await this.connection.getBalance(new PublicKey(publicKey));
    return balance / 1e9; // Lamports to SOL
  }
}
