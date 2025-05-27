
import { Entity } from '@/shared/entity'; 
import { Real } from '../valueObjects/real';

export interface GoodProps {
	startingBid: Real; 
	description: string;
	observation?: string;
	initialValue: Real; 
}

export interface GoodInput {
	startingBid: number; 
	description: string;
	observation?: string;
	initialValue: number; 
}

export abstract class Good extends Entity<GoodProps> {
	
	get startingBid(): Real {
		return this.props.startingBid;
	}

	get description(): string {
		return this.props.description;
	}

	get observation(): string | undefined {
		return this.props.observation;
	}

	get initialValue(): Real {
		return this.props.initialValue;
	}

	public abstract getCategory(): string;
}