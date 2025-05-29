import { CreateAuctionItemDTO } from './create-auction-item.dto';

export interface CreateAuctionDTO{
	publicationDate :Date     
	items :CreateAuctionItemDTO[]
	openDates :Date[]
	auctioneerId :string        
	committeeId :string       
	metaData?:Record<string, string> 
}