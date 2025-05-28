import z from 'zod';
import { applyRealEstateTransformsAndRefines } from '@/shared/realEstateSchema';
import { Address } from '../../valueObjects/address';
import { Area, AreaUnit } from '../../valueObjects/area';
import { Real } from '../../valueObjects/real';
import { UniqueID } from '../../valueObjects/uniqueId';
import { baseRealEstateInputSchema, RealEstate, RealEstateDTO,RealEstateProps } from './realEstate';

export interface BuiltPropertyProps extends RealEstateProps {
	hasGarage: boolean;
	numberOfBedrooms: number;
}

export interface BuiltPropertyDTO extends RealEstateDTO {
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

	public static create(input: BuiltPropertyDTO, id?: UniqueID): BuiltProperty {
		try {
			fullBuiltPropertySchema.parse(input);

			return new BuiltProperty({
				address:Address.create(input.address),
				allowVisits: input.allowVisits,
				builtArea:Area.create(input.builtArea.value,AreaUnit[input.builtArea.unit]),
				debits:Real.create(input.debits),
				fieldArea:Area.create(input.fieldArea.value,AreaUnit[input.fieldArea.unit]),
				hasGarage: input.hasGarage,
				isOccupied: input.isOccupied,
				lawsuit: input.lawsuit,
				numberOfBedrooms: input.numberOfBedrooms,
				privateArea:Area.create(input.privateArea.value,AreaUnit[input.privateArea.unit]),
				registration: input.registration,
				totalArea:Area.create(input.totalArea.value,AreaUnit[input.totalArea.unit]),
				complement: input.complement,
				distanceToMetro: input.distanceToMetro
			}, id);
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