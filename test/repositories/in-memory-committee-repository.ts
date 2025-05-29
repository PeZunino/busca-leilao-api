import { CommitteeRepository } from '@/modules/auctions/application/repositories/committee.repository';
import { Committee } from '@/modules/auctions/domain/entities/committee';

export class InMemoryCommitteeRepository implements CommitteeRepository{
	public items: Committee[] = [];

	async create(committee: Committee): Promise<void> {
		this.items.push(committee);
	}
	async findById(id: string): Promise<Committee | null> {
		const committee = this.items.find(e=>e.id.toString() === id);
	
		if(!committee){
			return null; 
		}
	
		return committee;
	}
}