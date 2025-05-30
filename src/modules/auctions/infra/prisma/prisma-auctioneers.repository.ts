import { Injectable } from '@nestjs/common';
import { AuctioneersRepository } from '@/modules/auctions/application/repositories/auctioneer.repository';
import { Auctioneer } from '@/modules/auctions/domain/entities/auctioneer';
import { PrismaAuctioneerMapper } from '../../../../core/database/prisma/mappers/prisma-auctioneer-mapper';
import { PrismaService } from '../../../../core/database/prisma/prisma.service';

@Injectable()
export class PrismaAuctioneersRepository implements AuctioneersRepository{

	constructor(
		private prisma: PrismaService,
	){}

	async create(auctioneer: Auctioneer): Promise<void> {
		const data = PrismaAuctioneerMapper.toPrisma(auctioneer);

		await this.prisma.auctioneer.create({data});
	}

	async findById(id: string): Promise<Auctioneer | null> {
		const data = await this.prisma.auctioneer.findUnique({where:{id}});

		if(!data){
			return null;
		}

		return PrismaAuctioneerMapper.toDomain(data);

	}
  
}