import { Module } from '@nestjs/common';
import { WalletModule } from './wallet/wallet.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [WalletModule, TransactionModule],
})
export class AppModule {}
