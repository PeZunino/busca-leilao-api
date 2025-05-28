import { Entity } from '../../../../core/shared/entity';
import { UniqueID } from '../valueObjects/uniqueId';

interface Props{  
	date :Date                  
	auctionId :UniqueID
}

export class AuctionOpening extends Entity<Props>{
	public static create(props:Props){
		return new AuctionOpening(props);
	}

	get date():Date{
		return this.date;
	}
}