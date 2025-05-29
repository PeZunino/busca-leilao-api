import { Injectable } from '@nestjs/common';
import { success } from '@/core/either';
import { Auction } from '../../domain/entities/auction';
import { AuctionItem, CreateAuctionItemDTO } from '../../domain/entities/auctionItem';
import { AuctionOpening } from '../../domain/entities/auctionOpening';
import { GoodFactory } from '../../domain/factories/good';
import { Metadata } from '../../domain/valueObjects/metaData';
import { Real } from '../../domain/valueObjects/real';
import { UniqueID } from '../../domain/valueObjects/uniqueId';
import { AuctionsRepository } from '../repositories/auctions.repository';



export interface CreateAuctionDTO{
	publicationDate :Date     
	items :CreateAuctionItemDTO[]
	openDates :Date[]
	auctioneerId :string        
	committeeId :string       
	metaData?:Record<string, string> 
}


@Injectable()
export class CreateAuctionUseCase{
	
	constructor(private auctionsRepository:AuctionsRepository){}
  
	async execute(input:CreateAuctionDTO){

		
		const auctionId = new UniqueID();

		const items = input.items.map(item=>
			AuctionItem.create({
				origin: item.origin,
				startingBid: Real.create(item.startingBid),
				description:item.description,
				observation: item.observation,
				initialValue: Real.create(item.initialValue),
				debits: Real.create(item.debits),
				good:GoodFactory.create(item.good),
			})
		);

		const openDates = input.openDates.map(date=>
			AuctionOpening.create({
				auctionId,
				date
			})
		);

		const auction = Auction.create({
			publicationDate: input.publicationDate,
			metaData: input.metaData ? Metadata.create(input.metaData) : undefined,
			items,
			openDates,
			auctioneerId: new UniqueID(input.auctioneerId),
			committeeId: new UniqueID(input.committeeId)
		}, auctionId);
    
		await this.auctionsRepository.create(auction);

		return success({auction});
	}
}