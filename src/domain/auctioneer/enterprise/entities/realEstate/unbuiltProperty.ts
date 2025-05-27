import z from 'zod';
import { UniqueID } from '@/domain/valueObjects/uniqueId';
import { applyRealEstateTransformsAndRefines } from '@/shared/realEstateSchema';
import { baseRealEstateInputSchema, RealEstate, RealEstateInput,RealEstateProps } from './realEstate';

export interface UnbuiltPropertyProps extends RealEstateProps {
	isUrban: boolean;
	hasWaterAccess: boolean;
}

export interface UnbuiltPropertyInput extends RealEstateInput {
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

	public static create(input: UnbuiltPropertyInput, id?: UniqueID): UnbuiltProperty {
		try {
			const validatedProps = fullUnbuiltPropertySchema.parse(input);

			return new UnbuiltProperty(validatedProps as UnbuiltPropertyProps, id);
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