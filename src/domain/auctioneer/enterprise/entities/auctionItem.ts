import { z } from 'zod';
import { Entity } from '../../../../core/shared/entity';
import { Real } from '../valueObjects/real';
import { UniqueID } from '../valueObjects/uniqueId';
import { BuiltPropertyDTO, BuiltPropertyProps, fullBuiltPropertySchema } from './realEstate/builtProperty';
import { fullUnbuiltPropertySchema, UnbuiltPropertyDTO, UnbuiltPropertyProps } from './realEstate/unbuiltProperty';
import { CarDTO, CarProps, fullCarSchema } from './vehicle/car';
import { fullMotorcycleSchema, MotorcycleDTO, MotorcycleProps } from './vehicle/motorcycle';

interface AuctionItemProps{
	startingBid: Real; 
	description: string;
	observation: string;
	origin:string
	initialValue: Real; 
	good:CarProps | MotorcycleProps | BuiltPropertyProps | UnbuiltPropertyProps
}

export interface CreateAuctionDTO{
	itemType: 'car' | 'motorcycle' | 'built' | 'unbuilt'
	origin:string
	startingBid: number; 
	description: string;
	observation: string;
	initialValue: number; 
	good:CarDTO | MotorcycleDTO | BuiltPropertyDTO | UnbuiltPropertyDTO
  
}

const baseSchema = {
	origin: z.string()
		.min(3, 'Origin must be at least 3 characters'),
	startingBid: z.number(),
	description: z.string()
		.min(10, 'Description must be at least 10 characters'),
	observation: z.string()
		.optional(),
	initialValue: z.number(),
};

export const auctionItemInputSchema = z.discriminatedUnion('itemType', [
	z.object({
		itemType: z.literal('car'),
		good: fullCarSchema,
		...baseSchema,
	}),
	z.object({
		itemType: z.literal('motorcycle'),
		good: fullMotorcycleSchema,
		...baseSchema,
	}),
	z.object({
		itemType: z.literal('built'),
		good: fullBuiltPropertySchema,
		...baseSchema,
	}),
	z.object({
		itemType: z.literal('unbuilt'),
		good: fullUnbuiltPropertySchema,
		...baseSchema,
	}),
]);

export class AuctionItem extends Entity<AuctionItemProps>{
	protected constructor(protected readonly props: AuctionItemProps, id?: UniqueID) {
		super(props, id);
	}

	public static create(input:CreateAuctionDTO, id?:UniqueID){
		try {
          
			const validatedProps = auctionItemInputSchema.parse(input);
    
			return new AuctionItem({
				startingBid: Real.create(validatedProps.startingBid),
				initialValue: Real.create(validatedProps.initialValue),
				description: validatedProps.description,
				observation: validatedProps.observation ?? '',
				origin: validatedProps.origin,
				good: validatedProps.good,
			}, id);

		} catch (error: any) {
			if (error instanceof z.ZodError) {
				throw new Error(`AuctionItem creation failed: ${error.errors.map(e => e.message)
					.join(', ')}`);
			}
    
			throw new Error(`AuctionItem creation failed: ${error.message || 'Unknown error'}`);
		}
	}

	get description(): string {
		return this.props.description;
	}

	get observation(): string {
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