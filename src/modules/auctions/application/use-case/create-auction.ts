import { success } from '@/core/either';
import { Auction } from '../../domain/entities/auction';
import { UniqueID } from '../../domain/valueObjects/uniqueId';
import { CreateAuctionItemDTO } from '../dto/create-auction-item.dto';
import { AuctionsRepository } from '../repositories/auctions.repository';

interface CreateAuctionUseCaseRequest{
	publicationDate :Date     
	items :CreateAuctionItemDTO[]
	openDates :Date[]
	auctioneerId :string        
	committeeId :string       
	metaData?:Record<string, string> 
}

export class CreateAuctionUseCase{
	
	constructor(private auctionsRepository:AuctionsRepository){}
  
	async execute({
		auctioneerId,committeeId,items,openDates,publicationDate,metaData
	}:CreateAuctionUseCaseRequest){

		const auctionId = new UniqueID();

		const auction = Auction.create({
			publicationDate,
			metaData,
			items,
			openDates,
			auctioneerId,
			committeeId
		}, auctionId);
    
		await this.auctionsRepository.create(auction);

		return success({auction});
	}
}