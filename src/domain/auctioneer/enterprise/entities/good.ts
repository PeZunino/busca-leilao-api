
import { Entity } from '@/core/shared/entity';
import { Real } from '../valueObjects/real';

export interface GoodProps {
	startingBid: Real; 
	initialValue: Real; 
}

export interface GoodInput {
	origin:string
	startingBid: number; 
	description: string;
	observation: string;
	initialValue: number; 
}

export abstract class Good extends Entity<GoodProps> {
	
	get startingBid(): Real {
		return this.props.startingBid;
	}

	get initialValue(): Real {
		return this.props.initialValue;
	}
	
	public abstract getCategory(): string;
}