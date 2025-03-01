"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const transaction_service_1 = require("./transaction.service");
class TransferSOLDto {
}
let TransactionController = class TransactionController {
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    transferSOL(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.transactionService.transferSOL(body.fromSecret, body.toPublicKey, body.amount);
        });
    }
};
exports.TransactionController = TransactionController;
__decorate([
    (0, common_1.Post)('transfer'),
    (0, swagger_1.ApiOperation)({ summary: 'Transfer SOL tokens' }),
    (0, swagger_1.ApiBody)({
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
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TransferSOLDto]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "transferSOL", null);
exports.TransactionController = TransactionController = __decorate([
    (0, swagger_1.ApiTags)('Transaction'),
    (0, common_1.Controller)('transsssssssssssaction'),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService])
], TransactionController);
