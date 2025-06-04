import { UseCaseError } from './use-case-error';

export class AuctioneerAlreadyRegistered extends Error implements UseCaseError {
	constructor(email: string, name:string) {
		super(`"${name}" already registered with "${email}"`);
	}
}