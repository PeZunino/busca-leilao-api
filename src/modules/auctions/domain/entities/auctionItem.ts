import { Entity } from '../../../../core/shared/entity';
import { CreateGoodDTO, GoodObject} from '../factories/good';
import { Real } from '../valueObjects/real';
import { UniqueID } from '../valueObjects/uniqueId';

interface AuctionItemProps{
	startingBid: Real; 
	description: string;
	observation?: string;
	origin:string
	initialValue: Real; 
	debits:Real
	good:GoodObject
}

export interface CreateAuctionItemDTO{
	origin:string
	startingBid: number; 
	description: string;
	observation?: string;
	initialValue: number; 
	debits:number;
	good: CreateGoodDTO;  
}

export class AuctionItem extends Entity<AuctionItemProps>{
	public static create(props:AuctionItemProps, id?:UniqueID){
          
		return new AuctionItem({
			debits:props.debits,
			startingBid: props.startingBid,
			initialValue: props.initialValue,
			description: props.description,
			observation: props.observation,
			origin: props.origin,
			good:props.good,
		}, id);

	}

	get description(): string {
		return this.props.description;
	}

	get observation(): string | undefined {
		return this.props.observation;
	}

	get origin(): string {
		return this.props.origin;
	}

	get startingBid(): Real {
		return this.props.startingBid;
	}

	get initialValue():Real{
		return this.props.initialValue;
	}
}