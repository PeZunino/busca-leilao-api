import { Injectable } from '@nestjs/common';
import { CommitteeRepository } from '@/modules/auctions/application/repositories/committee.repository';
import { Committee } from '@/modules/auctions/domain/entities/committee';
import { PrismaCommitteeMapper } from '../../../../core/database/prisma/mappers/prisma-committee-mapper';
import { PrismaService } from '../../../../core/database/prisma/prisma.service';

@Injectable()
export class PrismaCommitteeRepository implements CommitteeRepository{
	constructor(
		private prisma:PrismaService
	){}
	async create(committee: Committee): Promise<void> {
		const data = PrismaCommitteeMapper.toPrisma(committee);
    
		await this.prisma.committee.create({data});
	}
	async findById(id: string): Promise<Committee | null> {
		const data = await this.prisma.auctioneer.findUnique({where:{id}});
	
		if(!data){
			return null;
		}
	
		return PrismaCommitteeMapper.toDomain(data);
	
	}
}