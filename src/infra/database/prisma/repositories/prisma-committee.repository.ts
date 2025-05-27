import { CommitteeRepository } from '@/domain/auctioneer/application/repositories/committee.repository';
import { Committee } from '@/domain/auctioneer/enterprise/entities/committee';
import { PrismaCommitteeMapper } from '../mappers/prisma-committee-mapper';
import { PrismaService } from '../prisma.service';

export class PrismaCommitteeRepository implements CommitteeRepository{
	constructor(
		private prisma:PrismaService
	){}
	async create(committee: Committee): Promise<void> {
		const data = PrismaCommitteeMapper.toPrisma(committee);
    
		await this.prisma.committee.create({data});
	}
}