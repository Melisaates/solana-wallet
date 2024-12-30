import { Controller, Get, Post, Param } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Post('create')
  createWallet() {
    return this.walletService.createWallet();
  }

  @Get('balance/:publicKey')
  getBalance(@Param('publicKey') publicKey: string) {
    return this.walletService.getBalance(publicKey);
  }
}
