import { AggregateRoot } from '@/core/shared/aggregateRoot';
import { UniqueID } from '../valueObjects/uniqueId';
import { AuctionItem} from './auctionItem';
import { AuctionOpening } from './auctionOpening';

export interface AuctionProps {
	publicationDate: Date;
	createdAt:Date;
	updatedAt?:Date | null;
	items: AuctionItem[];
	openDates: AuctionOpening[];
	auctioneerId :UniqueID        
	committeeId :UniqueID    
}

export class Auction extends AggregateRoot<AuctionProps> {

	public static create(props: AuctionProps, id?: UniqueID): Auction {

		return new Auction(props, id);
	}

	get publicationDate(): Date {
		return this.props.publicationDate;
	}

	get openDates(): AuctionOpening[] {
		return this.props.openDates;
	}

	public addOpenDates(date:Date){
		this.props.openDates.push(AuctionOpening.create({
			auctionId: this.id,
			date,
			createdAt: new Date()
		}));
	}

	get items(): AuctionItem[] {
		return this.props.items;
	}
	
	public addItem(item: AuctionItem): void {
		this.props.items.push(item);
	}

	get auctioneerId():UniqueID{
		return this.props.auctioneerId;
	}

	get committeeId():UniqueID{
		return this.props.committeeId;
	}

	get createdAt(){
		return this.props.createdAt;
	}

	get updatedAt(){
		return this.props.updatedAt;
	}
}