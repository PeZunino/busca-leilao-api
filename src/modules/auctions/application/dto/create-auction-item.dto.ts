import { CreateGoodDTO } from './create-good.dto';

export interface CreateAuctionItemDTO{
	origin:string
	startingBid: number; 
	description: string;
	observation: string;
	initialValue: number; 
	good: CreateGoodDTO;  
}