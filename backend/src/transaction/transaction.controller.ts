import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';

class TransferSOLDto {
  fromSecret!: number[];
  toPublicKey!: string;
  amount!: number;
}

@ApiTags('Transaction')
@Controller('transsssssssssssaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post('transfer')
  @ApiOperation({ summary: 'Transfer SOL tokens' })
  @ApiBody({
    description: 'Transfer details for SOL tokens',
    schema: {
      type: 'object',
      properties: {
        fromSecret: {
          type: 'array',
          items: { type: 'number' },
          description: 'Array of numbers representing the secret key',
        },
        toPublicKey: {
          type: 'string',
          description: 'Recipient public key',
        },
        amount: {
          type: 'number',
          description: 'Amount of SOL to transfer',
        },
      },
      required: ['fromSecret', 'toPublicKey', 'amount'],
    },
  })
  async transferSOL(@Body() body: TransferSOLDto) {
    return this.transactionService.transferSOL(body.fromSecret, body.toPublicKey, body.amount);
  }
}
