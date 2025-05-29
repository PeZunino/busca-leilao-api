import { AggregateRoot } from '@/core/shared/aggregateRoot';
import { Metadata } from '../valueObjects/metaData';
import { UniqueID } from '../valueObjects/uniqueId';
import { AuctionItem} from './auctionItem';
import { AuctionOpening } from './auctionOpening';

export interface AuctionProps {
	publicationDate: Date;
	auctioneerId :UniqueID        
	committeeId :UniqueID    
	openDates: AuctionOpening[];
	items: AuctionItem[];
	metaData?: Metadata;
}

export class Auction extends AggregateRoot<AuctionProps> {

	private constructor(props: AuctionProps, id?: UniqueID) {
		super(props, id);
	}

	public static create(props: AuctionProps , id?: UniqueID): Auction {

		return new Auction(props, id);
	}

	public addItem(item: AuctionItem): void {
		this.props.items.push(item);
	}

	public removeItem(itemId: UniqueID): void {
		this.props.items = this.props.items.filter(item => !item.id.equals(itemId));
	}

	get publicationDate(): Date {
		return this.props.publicationDate;
	}

	get openDates(): AuctionOpening[] {
		return this.props.openDates;
	}

	get items(): AuctionItem[] {
		return this.props.items;
	}

	get metaData(): Metadata | undefined {
		return this.props.metaData;
	}

	get auctioneerId():UniqueID{
		return this.auctioneerId;
	}

	get committeeId():UniqueID{
		return this.committeeId;
	}
}