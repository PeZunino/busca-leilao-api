import { Module } from '@nestjs/common';
import { AuctioneersRepository } from '@/domain/auctioneer/application/repositories/auctioneer.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAuctioneersRepository } from './prisma/repositories/prisma-auctioneers.repository';

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