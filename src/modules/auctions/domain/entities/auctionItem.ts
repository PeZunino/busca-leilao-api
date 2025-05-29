import { z } from 'zod';
import { Entity } from '../../../../core/shared/entity';
import { GoodObject, GoodType } from '../factories/good';
import { Real } from '../valueObjects/real';
import { UniqueID } from '../valueObjects/uniqueId';
import { fullBuiltPropertySchema } from './realEstate/builtProperty';
import { fullUnbuiltPropertySchema,} from './realEstate/unbuiltProperty';
import { fullCarSchema } from './vehicle/car';
import { fullMotorcycleSchema } from './vehicle/motorcycle';

const carSchema = z.object({
	type: z.literal(GoodType.CAR),
	data: fullCarSchema
});

const motorcycleSchema = z.object({
	type: z.literal(GoodType.MOTORCYCLE),
	data: fullMotorcycleSchema
});

const builtPropertySchema = z.object({
	type: z.literal(GoodType.BUILT_PROPERTY),
	data: fullBuiltPropertySchema
});

const unbuiltPropertySchema = z.object({
	type: z.literal(GoodType.UNBUILT_PROPERTY),
	data: fullUnbuiltPropertySchema
});

export const goodDTOSchema = z.discriminatedUnion('type', [
	carSchema,
	motorcycleSchema,
	builtPropertySchema,
	unbuiltPropertySchema
]);

const baseSchema = {
	origin: z.string()
		.min(3, 'Origin must be at least 3 characters'),
	startingBid: z.number(),
	description: z.string()
		.min(10, 'Description must be at least 10 characters'),
	observation: z.string()
		.optional(),
	initialValue: z.number(),
	good: goodDTOSchema 
};

export const auctionItemInputSchema = z.object(baseSchema);


interface AuctionItemProps{
	startingBid: Real; 
	description: string;
	observation: string;
	origin:string
	initialValue: Real; 
	good:GoodObject
}

export class AuctionItem extends Entity<AuctionItemProps>{
	public static create(props:AuctionItemProps, id?:UniqueID){
		try {
          
			auctionItemInputSchema.parse(props);

			return new AuctionItem({
				startingBid: props.startingBid,
				initialValue: props.initialValue,
				description: props.description,
				observation: props.observation ?? '',
				origin: props.origin,
				good:props.good,
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