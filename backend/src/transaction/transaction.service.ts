import { Injectable, BadRequestException } from '@nestjs/common';
import { 
  Connection, 
  Keypair, 
  PublicKey, 
  SystemProgram, 
  LAMPORTS_PER_SOL, 
  clusterApiUrl, 
  TransactionMessage, 
  VersionedTransaction 
} from '@solana/web3.js';

@Injectable()
export class TransactionService {
  private connection: Connection;

  constructor() {
    this.connection = new Connection(clusterApiUrl('devnet'));
  }

  async transferSOL(fromSecret: number[], toPublicKey: string, amount: number) {
    // Validate inputs
    if (!fromSecret || !Array.isArray(fromSecret) || fromSecret.length === 0) {
      throw new BadRequestException('Invalid fromSecret: Expected a non-empty array of numbers.');
    }
    if (!toPublicKey) {
      throw new BadRequestException('Invalid toPublicKey: Public key is required.');
    }
    if (isNaN(amount) || amount <= 0) {
      throw new BadRequestException('Invalid amount: Amount must be a positive number.');
    }

    try {
      const fromKeypair = Keypair.fromSecretKey(Uint8Array.from(fromSecret));
      const toPublicKeyObj = new PublicKey(toPublicKey);

      // Get the latest blockhash
      const latestBlockhash = await this.connection.getLatestBlockhash();

      // Create a TransactionMessage
      const messageV0 = new TransactionMessage({
        payerKey: fromKeypair.publicKey,
        recentBlockhash: latestBlockhash.blockhash,
        instructions: [
          SystemProgram.transfer({
            fromPubkey: fromKeypair.publicKey,
            toPubkey: toPublicKeyObj,
            lamports: amount * LAMPORTS_PER_SOL,
          }),
        ],
      }).compileToV0Message();

      // Create a VersionedTransaction
      const transaction = new VersionedTransaction(messageV0);

      // Sign the transaction
      transaction.sign([fromKeypair]);

      // Send the transaction
      const signature = await this.connection.sendTransaction(transaction);
      return { signature };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(`Transaction failed: ${error.message}`);
      } else {
        throw new BadRequestException('Transaction failed: Unknown error');
      }
    }
  }
}
