import { Injectable } from '@nestjs/common';
import { AuctioneersRepository } from '@/domain/auctioneer/application/repositories/auctioneer.repository';
import { Auctioneer } from '@/domain/auctioneer/enterprise/entities/auctioneer';
import { PrismaAuctioneerMapper } from '../mappers/prisma-auctioneer-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAuctioneersRepository implements AuctioneersRepository{

	constructor(
		private prisma: PrismaService,
	){}

	async create(auctioneer: Auctioneer): Promise<void> {
		const data = PrismaAuctioneerMapper.toPrisma(auctioneer);

		await this.prisma.auctioneer.create({data});
	}
  
}