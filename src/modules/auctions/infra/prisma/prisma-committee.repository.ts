import { CommitteeRepository } from '@/modules/auctions/application/repositories/committee.repository';
import { Committee } from '@/modules/auctions/domain/entities/committee';
import { PrismaCommitteeMapper } from '../../../../infra/database/prisma/mappers/prisma-committee-mapper';
import { PrismaService } from '../../../../infra/database/prisma/prisma.service';

export class PrismaCommitteeRepository implements CommitteeRepository{
	constructor(
		private prisma:PrismaService
	){}
	async create(committee: Committee): Promise<void> {
		const data = PrismaCommitteeMapper.toPrisma(committee);
    
		await this.prisma.committee.create({data});
	}
}