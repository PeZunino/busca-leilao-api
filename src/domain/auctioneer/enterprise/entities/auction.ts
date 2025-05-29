import { AggregateRoot } from '@/core/shared/aggregateRoot';
import { Metadata } from '../valueObjects/metaData';
import { UniqueID } from '../valueObjects/uniqueId';
import { AuctionItem, CreateAuctionItemDTO } from './auctionItem';
import { AuctionOpening } from './auctionOpening';


export interface AuctionProps {
	publicationDate: Date;
	auctioneerId :UniqueID        
	committeeId :UniqueID    
	openDates: AuctionOpening[];
	items: AuctionItem[];
	metaData?: Metadata;
}

export interface AuctionPropsInput{
	publicationDate: Date;
	openDates: Date[];
	auctioneerId :string        
	committeeId :string       
	items: CreateAuctionItemDTO[];
	metaData?: Record<string,string>;
}

export class Auction extends AggregateRoot<AuctionProps> {

	private constructor(props: AuctionProps, id?: UniqueID) {
		super(props, id);
	}

	public static create(props: AuctionPropsInput , id?: UniqueID): Auction {

		const metaData = props.metaData ? Metadata.create(props.metaData) : undefined;

		const auctionId = id ?? new UniqueID();

		const items = props.items.map(item=>{
			const itemProps = {
				origin: item.origin,
				startingBid: item.startingBid, 
				description: item.description,
				observation: item.observation,
				initialValue: item.initialValue
			};
		
			switch(item.itemType ){
				case 'car':
					return AuctionItem.create({
						itemType: 'car',
						...itemProps,
						good: item.good
					}, auctionId);
		
				case 'motorcycle':
					return AuctionItem.create({
						itemType: 'motorcycle',
						...itemProps,
						good: item.good
					}, auctionId);
		
				case 'built':
					return AuctionItem.create({
						itemType: 'built',
						...itemProps,
						good: item.good
					}, auctionId);
		
				case 'unbuilt':
					return AuctionItem.create({
						itemType: 'unbuilt',
						...itemProps,
						good: item.good
					}, auctionId);
			}
		});


		return new Auction({
			...props,
			metaData,
			items,
			openDates:props.openDates.map(date=>
				AuctionOpening.create({
					auctionId,
					date
				})
			),
			auctioneerId:new UniqueID(props.auctioneerId),
			committeeId:new UniqueID(props.committeeId),
		}, id);
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