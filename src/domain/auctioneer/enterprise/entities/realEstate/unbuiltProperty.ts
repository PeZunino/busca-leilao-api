import z from 'zod';
import { applyRealEstateTransformsAndRefines } from '@/shared/realEstateSchema';
import { Address } from '../../valueObjects/address';
import { Area, AreaUnit } from '../../valueObjects/area';
import { Real } from '../../valueObjects/real';
import { UniqueID } from '../../valueObjects/uniqueId';
import { baseRealEstateInputSchema, RealEstate, RealEstateDTO,RealEstateProps } from './realEstate';

export interface UnbuiltPropertyProps extends RealEstateProps {
	isUrban: boolean;
	hasWaterAccess: boolean;
}

export interface UnbuiltPropertyDTO extends RealEstateDTO {
	isUrban: boolean;
	hasWaterAccess: boolean;
}

const unbuiltPropertySpecificInputSchema = z.object({
	isUrban: z.boolean(),
	hasWaterAccess: z.boolean(),
});

const unbuiltPropertyRefines = (schema: z.ZodSchema<any>) => schema.refine(data => {
	const transformedData = data as UnbuiltPropertyProps;

	return transformedData.fieldArea.toSquareMeters() === transformedData.totalArea.toSquareMeters();
}, {
	message: 'For an unbuilt property, field area must equal total area',
	path: [
		'fieldArea'
	],
});


export const fullUnbuiltPropertySchema = unbuiltPropertyRefines(
	applyRealEstateTransformsAndRefines(
		baseRealEstateInputSchema.extend(unbuiltPropertySpecificInputSchema.shape)
	)
);

export class UnbuiltProperty extends RealEstate {
	private constructor(protected readonly props: UnbuiltPropertyProps, id?: UniqueID) {
		super(props, id);
	}

	public static create(input: UnbuiltPropertyDTO, id?: UniqueID): UnbuiltProperty {
		try {
			fullUnbuiltPropertySchema.parse(input);

			return new UnbuiltProperty({
				address:Address.create(input.address),
				allowVisits:input.allowVisits,
				builtArea:Area.create(input.builtArea.value,AreaUnit[input.builtArea.unit]),
				debits:Real.create(input.debits),
				fieldArea:Area.create(input.fieldArea.value,AreaUnit[input.fieldArea.unit]),
				hasWaterAccess:input.hasWaterAccess,
				isOccupied:input.isOccupied,
				isUrban:input.isUrban,
				lawsuit:input.lawsuit,
				privateArea:Area.create(input.privateArea.value,AreaUnit[input.privateArea.unit]),
				registration:input.registration,
				totalArea:Area.create(input.totalArea.value,AreaUnit[input.totalArea.unit]),
				complement:input.complement,
				distanceToMetro:input.distanceToMetro
			}, id);
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				throw new Error(`Unbuilt Property creation failed: ${error.errors.map(e => e.message)
					.join(', ')}`);
			}

			throw new Error(`Unbuilt Property creation failed: ${error.message || 'Unknown error'}`);
		}
	}

	get isUrban(): boolean {
		return this.props.isUrban; 
	}
	get hasWaterAccess(): boolean {
		return this.props.hasWaterAccess; 
	}

	public calculateMarketValue(): number {
		return this.totalArea.toSquareMeters() * (this.isUrban ? 1500 : 500) + (this.hasWaterAccess ? 10000 : 0);
	}

	public getType(): string {
		return 'UnbuiltProperty';
	}
}