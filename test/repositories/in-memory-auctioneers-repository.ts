import { AuctioneersRepository } from '@/modules/auctions/application/repositories/auctioneer.repository';
import { Auctioneer } from '@/modules/auctions/domain/entities/auctioneer';

export class InMemoryAuctioneerRepository implements AuctioneersRepository{
	
	public items:Auctioneer[] = [];

	async create(auctioneer: Auctioneer): Promise<void> {
		this.items.push(auctioneer);
	}

	async findById(id: string): Promise<Auctioneer | null> {
		const auctioneer = this.items.find(e=>e.id.toString() === id);
		
		if(!auctioneer){
			return null; 
		}
		
		return auctioneer;
	}

	async findByEmail(email: string): Promise<Auctioneer | null> {
		const auctioneer = this.items.find(e=>e.email.address === email);
		
		if(!auctioneer){
			return null; 
		}
		
		return auctioneer;
	}

	async findByUniqueHash(hash: string): Promise<Auctioneer | null> {
		const auctioneer = this.items.find(e=>e.uniqueHash === hash);
		
		if(!auctioneer){
			return null; 
		}
		
		return auctioneer;
	}
  
}