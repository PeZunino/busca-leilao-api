import { Auctioneer } from '../../domain/entities/auctioneer';

export abstract class AuctioneersRepository{
	abstract create(auctioneer:Auctioneer):Promise<void>
}  