import { Module } from '@nestjs/common';
import { HashComparer } from '../../application/cryptography/hash-compare';
import { HashGenerator } from '../../application/cryptography/hash-generator';
import { BcryptHasher } from './bcrypt-hasher';

@Module({
	providers: [

		{
			provide: HashComparer,
			useClass: BcryptHasher 
		},
		{
			provide: HashGenerator,
			useClass: BcryptHasher 
		},
	],
	exports: [
		HashComparer, HashGenerator
	],
})
export class CryptographyModule {}