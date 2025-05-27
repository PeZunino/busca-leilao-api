import z from 'zod';
import { UniqueID } from '@/domain/valueObjects/uniqueId';
import { applyRealEstateTransformsAndRefines } from '@/shared/realEstateSchema';
import { baseRealEstateInputSchema, RealEstate, RealEstateInput,RealEstateProps } from './realEstate';

export interface BuiltPropertyProps extends RealEstateProps {
	hasGarage: boolean;
	numberOfBedrooms: number;
}

export interface BuiltPropertyInput extends RealEstateInput {
	hasGarage: boolean;
	numberOfBedrooms: number;
}

const builtPropertySpecificInputSchema = z.object({
	hasGarage: z.boolean(),
	numberOfBedrooms: z.number()
		.int()
		.positive()
		.min(1, 'Number of bedrooms must be at least 1'),
});

export const fullBuiltPropertySchema = applyRealEstateTransformsAndRefines(
	baseRealEstateInputSchema.extend(builtPropertySpecificInputSchema.shape)
);

export class BuiltProperty extends RealEstate {
	private constructor(protected readonly props: BuiltPropertyProps, id?: UniqueID) {
		super(props, id);
	}

	public static create(input: BuiltPropertyInput, id?: UniqueID): BuiltProperty {
		try {
			const validatedProps = fullBuiltPropertySchema.parse(input);

			return new BuiltProperty(validatedProps as BuiltPropertyProps, id);
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				throw new Error(`Built Property creation failed: ${error.errors.map(e => e.message)
					.join(', ')}`);
			}

			throw new Error(`Built Property failed: ${error.message || 'Unknown error'}`);
		}
	}

	public getType(): string {
		return 'BuiltProperty';
	}
	
	get hasGarage(): boolean {
		return this.props.hasGarage;
	}

	get numberOfBedrooms(): number {
		return this.props.numberOfBedrooms;
	}

}