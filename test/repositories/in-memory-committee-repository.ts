import { CommitteeRepository } from '@/modules/auctions/application/repositories/committee.repository';
import { Committee } from '@/modules/auctions/domain/entities/committee';

export class InMemoryCommitteeRepository implements CommitteeRepository{
	public items: Committee[] = [];

	async create(committee: Committee): Promise<void> {
		this.items.push(committee);
	}
}