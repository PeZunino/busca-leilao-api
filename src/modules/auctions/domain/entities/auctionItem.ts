import { Entity } from '../../../../core/shared/entity';
import { GoodObject} from '../factories/good';
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
	updatedAt?:Date | null;
	createdAt: Date
}

export class AuctionItem extends Entity<AuctionItemProps>{
	public static create(props:AuctionItemProps, id?:UniqueID){
          
		return new AuctionItem(props, id);

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
	get createdAt(){
		return this.props.createdAt;
	}
	get updatedAt(){
		return this.props.updatedAt;
	}
}