import { Entity } from '../../../../core/shared/entity';
import { UniqueID } from '../valueObjects/uniqueId';

interface AuctionOpeningProps {
	date: Date;
	auctionId: UniqueID;
}

export class AuctionOpening extends Entity<AuctionOpeningProps>{
	public static create(props:AuctionOpeningProps,id?:UniqueID){
		return new AuctionOpening({
			auctionId: props.auctionId,
			date: props.date
		},id);
	}

	get date():Date{
		return this.date;
	}
	
	get auctionId(): UniqueID {
		return this.props.auctionId;
	}
}