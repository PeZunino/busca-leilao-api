import { Auctioneer } from '../../enterprise/entities/auctioneer';

export abstract class AuctioneersRepository{
	abstract create(auctioneer:Auctioneer):Promise<void>
}  