
import {Auctioneer as PrismaAuctioneer,Prisma} from '@prisma/client';
import { Auctioneer } from '@/modules/auctions/domain/entities/auctioneer';
import { Address } from '@/modules/auctions/domain/valueObjects/address';
import { Email } from '@/modules/auctions/domain/valueObjects/email';
import { PhoneNumber } from '@/modules/auctions/domain/valueObjects/phone';
import { Website } from '@/modules/auctions/domain/valueObjects/website';

export class PrismaAuctioneerMapper{
	static toDomain(raw:PrismaAuctioneer):Auctioneer{
		return Auctioneer.create({
			address:Address.create({
				cep:raw.cep,
				city:raw.city,
				neighborhood:raw.neighborhood,
				number:raw.number,
				state:raw.state,
				street:raw.street,
			}),
			createdAt:raw.createdAt,
			email:Email.create(raw.email),
			name:raw.name,
			phoneNumber:PhoneNumber.create(raw.phoneNumber),
			registrationCode:raw.registrationCode,
			websites: raw.websites.map(site=>Website.create(site)) ,
			updatedAt:raw.updatedAt,
			uniqueHash: raw.uniqueHash
		});
	}
	
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
			websites: auctioneer.websites.map(website=>website.url.toString()),
			createdAt: auctioneer.createdAt,
			updatedAt: auctioneer.updatedAt,
			uniqueHash: auctioneer.uniqueHash
		};
	}
}