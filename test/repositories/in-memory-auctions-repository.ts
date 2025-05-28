import { AuctionsRepository } from '@/domain/auctioneer/application/repositories/auctions.repository';
import { Auction } from '@/domain/auctioneer/enterprise/entities/auction';

export class InMemoryAuctionsRepository implements AuctionsRepository{
	public items:Auction[] = [];

	async create(auction:Auction):Promise<void>{
		this.items.push(auction);
	}
}