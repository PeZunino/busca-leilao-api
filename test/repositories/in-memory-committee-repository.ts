import { CommitteeRepository } from '@/domain/auctioneer/application/repositories/committee.repository';
import { Committee } from '@/domain/auctioneer/enterprise/entities/committee';

export class InMemoryCommitteeRepository implements CommitteeRepository{
	public items: Committee[] = [];

	async create(committee: Committee): Promise<void> {
		this.items.push(committee);
	}
}