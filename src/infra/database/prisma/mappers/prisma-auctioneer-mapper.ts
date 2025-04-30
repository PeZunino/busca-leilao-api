import { Prisma } from '@prisma/client';
import { Auctioneer } from '@/domain/auctioneer/enterprise/entities/auctioneer';

export class PrismaAuctioneerMapper{
	static toPrisma(auctioneer:Auctioneer):Prisma.AuctioneerCreateInput{
		return{
			cep:auctioneer.cep,
			city: auctioneer.city,
			email: auctioneer.email,
			name: auctioneer.name,
			neighborhood: auctioneer.neighborhood,
			number: auctioneer.number,
			phone: auctioneer.phone,
			registrationCode: auctioneer.registrationCode,
			street: auctioneer.street,
			website: auctioneer.website,
			createdAt: auctioneer.createdAt,
			updatedAt: auctioneer.updatedAt,
			id:auctioneer.id.toString(),
		};
	}
}