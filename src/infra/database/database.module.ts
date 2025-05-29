import { Module } from '@nestjs/common';
import { AuctioneersRepository } from '@/modules/auctions/application/repositories/auctioneer.repository';
import { PrismaAuctioneersRepository } from '../../modules/auctions/infra/prisma/prisma-auctioneers.repository';
import { PrismaService } from './prisma/prisma.service';

@Module({
	providers:[
		PrismaService,
		{
			provide: AuctioneersRepository,
			useClass: PrismaAuctioneersRepository
		}
	],
	exports:[
		PrismaService,
		AuctioneersRepository
	]
})
export class DatabaseModule{}