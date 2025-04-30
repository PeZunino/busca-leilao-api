import { AuctioneersRepository } from '@/domain/auctioneer/application/repositories/auctioneer.repository';
import { Auctioneer } from '@/domain/auctioneer/enterprise/entities/auctioneer';

export class InMemoryAuctioneerRepository implements AuctioneersRepository{
	
	public items:Auctioneer[] = [];

	async create(auctioneer: Auctioneer): Promise<void> {
		this.items.push(auctioneer);
	}
  
}