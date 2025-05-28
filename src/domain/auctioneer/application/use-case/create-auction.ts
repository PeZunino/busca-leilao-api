import { success } from '@/core/either';
import { Auction } from '../../enterprise/entities/auction';
import { CreateAuctionDTO } from '../../enterprise/entities/auctionItem';
import { UniqueID } from '../../enterprise/valueObjects/uniqueId';
import { AuctionsRepository } from '../repositories/auctions.repository';

interface CreateAuctionUseCaseRequest{
	publicationDate :Date     
	items :CreateAuctionDTO[]
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