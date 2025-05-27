import { AggregateRoot } from '@/shared/aggregateRoot';
import { Metadata } from '../valueObjects/metaData';
import { UniqueID } from '../valueObjects/uniqueId';
import { Good } from './good';

export interface AuctionProps {
	publicationDate: Date;
	openDates: Date[];
	items: Good[];
	metaData?: Metadata;
}

export class Auction extends AggregateRoot<AuctionProps> {

	constructor(props: AuctionProps, id?: UniqueID) {
		super(props, id);
	}

	public static create(props: Omit<AuctionProps, 'metaData'> & {
		metaDataInput?: Record<string, string>; 
	}, id?: UniqueID): Auction {

		return new Auction({
			...props,
			metaData: props.metaDataInput ? Metadata.create(props.metaDataInput) : undefined,
			openDates: props.openDates.sort((a, b) => a.getTime() - b.getTime())
		}, id);
	}

	public addItem(item: Good): void {
		this.props.items.push(item);
	}

	public removeItem(itemId: UniqueID): void {
		this.props.items = this.props.items.filter(item => !item.id.equals(itemId));
	}

	get publicationDate(): Date {
		return this.props.publicationDate;
	}

	get openDates(): Date[] {
		return this.props.openDates;
	}

	get items(): Good[] {
		return this.props.items;
	}

	get metaData(): Metadata | undefined {
		return this.props.metaData;
	}
}