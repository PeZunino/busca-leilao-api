import { success } from '@/core/either';
import { Auction } from '../../domain/entities/auction';
import { AuctionItem } from '../../domain/entities/auctionItem';
import { AuctionOpening } from '../../domain/entities/auctionOpening';
import { GoodFactory } from '../../domain/factories/good';
import { Metadata } from '../../domain/valueObjects/metaData';
import { Real } from '../../domain/valueObjects/real';
import { UniqueID } from '../../domain/valueObjects/uniqueId';
import { CreateAuctionDTO } from '../dto/create-auction.dto';
import { AuctionsRepository } from '../repositories/auctions.repository';



export class CreateAuctionUseCase{
	
	constructor(private auctionsRepository:AuctionsRepository){}
  
	async execute(input:CreateAuctionDTO){

		const auctionId = new UniqueID();

		const items = input.items.map(item=>
			AuctionItem.create({
				description:item.description,
				good:GoodFactory.create(item.good),
				initialValue: Real.create(item.initialValue),
				observation: item.observation,
				origin: item.origin,
				startingBid: Real.create(item.startingBid)
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