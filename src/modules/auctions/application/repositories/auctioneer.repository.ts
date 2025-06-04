import { Auctioneer } from '../../domain/entities/auctioneer';

export abstract class AuctioneersRepository{
	abstract create(auctioneer:Auctioneer):Promise<void>
	abstract findById(id:string):Promise<Auctioneer | null>
	abstract findByEmail(email:string):Promise<Auctioneer | null>
	abstract findByUniqueHash(hash:string):Promise<Auctioneer | null>
}  