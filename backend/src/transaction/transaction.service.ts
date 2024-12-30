import { Injectable } from '@nestjs/common';
import { Connection, Keypair, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

@Injectable()
export class TransactionService {
  private connection: Connection;

  constructor() {
    this.connection = new Connection(clusterApiUrl('devnet'));
  }

  async transferSOL(fromSecret: number[], toPublicKey: string, amount: number) {
    const fromKeypair = Keypair.fromSecretKey(Uint8Array.from(fromSecret));
    const toKeypair = new PublicKey(toPublicKey);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromKeypair.publicKey,
        toPubkey: toKeypair,
        lamports: amount * LAMPORTS_PER_SOL,
      }),
    );

    const signature = await this.connection.sendTransaction(transaction, [fromKeypair]);
    return { signature };
  }
}
function clusterApiUrl(arg0: string): string {
    throw new Error('Function not implemented.');
}

