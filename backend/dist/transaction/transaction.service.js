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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const web3_js_1 = require("@solana/web3.js");
let TransactionService = class TransactionService {
    constructor() {
        this.connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)('devnet'));
    }
    transferSOL(fromSecret, toPublicKey, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate inputs
            if (!fromSecret || !Array.isArray(fromSecret) || fromSecret.length === 0) {
                throw new common_1.BadRequestException('Invalid fromSecret: Expected a non-empty array of numbers.');
            }
            if (!toPublicKey) {
                throw new common_1.BadRequestException('Invalid toPublicKey: Public key is required.');
            }
            if (isNaN(amount) || amount <= 0) {
                throw new common_1.BadRequestException('Invalid amount: Amount must be a positive number.');
            }
            try {
                const fromKeypair = web3_js_1.Keypair.fromSecretKey(Uint8Array.from(fromSecret));
                const toPublicKeyObj = new web3_js_1.PublicKey(toPublicKey);
                // Get the latest blockhash
                const latestBlockhash = yield this.connection.getLatestBlockhash();
                // Create a TransactionMessage
                const messageV0 = new web3_js_1.TransactionMessage({
                    payerKey: fromKeypair.publicKey,
                    recentBlockhash: latestBlockhash.blockhash,
                    instructions: [
                        web3_js_1.SystemProgram.transfer({
                            fromPubkey: fromKeypair.publicKey,
                            toPubkey: toPublicKeyObj,
                            lamports: amount * web3_js_1.LAMPORTS_PER_SOL,
                        }),
                    ],
                }).compileToV0Message();
                // Create a VersionedTransaction
                const transaction = new web3_js_1.VersionedTransaction(messageV0);
                // Sign the transaction
                transaction.sign([fromKeypair]);
                // Send the transaction
                const signature = yield this.connection.sendTransaction(transaction);
                return { signature };
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new common_1.BadRequestException(`Transaction failed: ${error.message}`);
                }
                else {
                    throw new common_1.BadRequestException('Transaction failed: Unknown error');
                }
            }
        });
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TransactionService);
