import { Controller, Post, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post('transfer')
  transferSOL(@Body() body: any) {
    return this.transactionService.transferSOL(body.fromSecret, body.toPublicKey, body.amount);
  }
}
