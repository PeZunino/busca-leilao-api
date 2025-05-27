import { Prisma } from '@prisma/client';
import { Auctioneer } from '@/domain/auctioneer/enterprise/entities/auctioneer';

export class PrismaAuctioneerMapper{
	static toPrisma(auctioneer:Auctioneer):Prisma.AuctioneerCreateInput{
		return{
			id: auctioneer.id.toString(),
			cep: auctioneer.address.cep,
			city:auctioneer.address.city,
			email: auctioneer.email.address,
			name: auctioneer.name,
			neighborhood: auctioneer.address.neighborhood,
			number: auctioneer.address.number,
			phoneNumber: auctioneer.phoneNumber.rawNumber,
			registrationCode: auctioneer.registrationCode,
			state: auctioneer.address.state,
			street: auctioneer.address.street,
			websites: auctioneer.websites.map(website=>website.url.toString())
		};
	}
}