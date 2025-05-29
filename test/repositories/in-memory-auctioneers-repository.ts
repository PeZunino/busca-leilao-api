import { AuctioneersRepository } from '@/modules/auctions/application/repositories/auctioneer.repository';
import { Auctioneer } from '@/modules/auctions/domain/entities/auctioneer';

export class InMemoryAuctioneerRepository implements AuctioneersRepository{
	
	public items:Auctioneer[] = [];

	async create(auctioneer: Auctioneer): Promise<void> {
		this.items.push(auctioneer);
	}
  
}