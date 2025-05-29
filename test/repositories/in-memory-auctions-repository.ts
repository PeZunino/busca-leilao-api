import { AuctionsRepository } from '@/modules/auctions/application/repositories/auctions.repository';
import { Auction } from '@/modules/auctions/domain/entities/auction';

export class InMemoryAuctionsRepository implements AuctionsRepository{
	public items:Auction[] = [];

	async create(auction:Auction):Promise<void>{
		this.items.push(auction);
	}
	async findById(id: string): Promise<Auction | null> {
		const auction = this.items.find(e=>e.id.toString() === id);

		if(!auction){
			return null; 
		}

		return auction;
	}
}