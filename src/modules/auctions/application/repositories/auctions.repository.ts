import { Auction } from '../../domain/entities/auction';

export abstract class AuctionsRepository{
	abstract create(auction:Auction):Promise<void>
} 